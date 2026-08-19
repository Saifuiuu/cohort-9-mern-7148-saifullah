
import { expect } from "chai";
import axios from "axios"; 
import Note from "../models/Note.js";
import User from "../models/User.js";
import { baseUrl } from "./setup.js";


const api=axios.create({
    baseURL:baseUrl,
    validateStatus: () => true
})

describe("Notes api",()=>{
    let cookie;
    let noteId;


before(async()=>{

    await api.post('/api/auth/signup',{
        name:"tester",
        email:"test@gmail.com",
        password:"12345678"
    });
console.log("before working")
    const response = await api.post('/api/auth/login',{
        email:"test@gmail.com",
        password:"12345678"
    })
 
    cookie=response.headers['set-cookie'][0]
    console.log(cookie)
})


after(async()=>{
    await User.deleteMany({});
    await Note.deleteMany({});
});



describe("Post /api/notes",()=>{

it("note should be created when user is logged in ",async()=>{
    console.log("first test run ")
  const res= await api.post('/api/note',{

title:"first test note",
content:"first note content"
    },
    {headers:{Cookie:cookie}}
)

expect(res.status).to.equal(201);
expect(res.data).to.have.property("title","first test note");


noteId=res.data._id;


})

it("should not create note without login ", async()=>{

  const res=  await api.post('/api/note',{
        name:"test note",
        content:"test note content"
    })

    expect(res.status).to.equal(401);
})

it("should not create note without name",async()=>{
  const res=  await api.post('/api/note',{
        content:"this is content for note"
    },{headers:{Cookie:cookie}})

    expect(res.status).to.equal(400)
})


})


describe("Get /api/notes",()=>{

it("should return all notes while logged in ",async()=>{
    const res= await api.get('/api/note',{headers:{Cookie:cookie}})

    expect(res.status).to.equal(200)
    expect(res.data).to.be.an("array")
})


it("should not return notes while user is not logged-in ",async()=>{
    const res=await api.get('/api/note')
    expect(res.status).to.equal(401)
})



})

describe('Get /api/note/:id',()=>{
    it("should return the single note with correct id",async()=>{
        
        const res= await api.get(`/api/note/${noteId}`,{headers:{Cookie:cookie}})

        expect(res.status).to.equal(200)
        expect(res.data).to.have.property('_id',noteId)
    })


    it("should not return note with fake id",async()=>{
        const fakeId="234te23"
const res=await api.get(`/api/note/${fakeId}`,{headers:{Cookie:cookie}})


expect(res.status).to.equal(404)
    })

    })


    describe("Put /api/note/:id",()=>{

it("should update a note",async()=>{
const res= await api.put(`/api/note/${noteId}`,{
    content:"new content"
},{headers:{Cookie:cookie}})

expect(res.status).to.equal(200)
expect(res.data).to.have.property("content","new content")

})

    })



    describe("Delete /api/notes/:id",()=>{
        
        it("should delete a note",async()=>{
            const res=await api.delete(`/api/note/${noteId}`,{headers:{Cookie:cookie}})
            expect(res.status).to.equal(200)
        })


        it("should return 404 when getting deleted notes",async()=>{
            const res=await api.get(`/api/note/${noteId}`,{headers:{Cookie:cookie}})

            expect(res.status).to.equal(404)
        })
    })

})