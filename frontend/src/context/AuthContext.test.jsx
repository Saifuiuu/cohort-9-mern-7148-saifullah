import {renderHook,waitFor,act} from "@testing-library/react";
import {AuthProvider,useAuth} from "./AuthContext";
import api from "../services/axios";

jest.mock("../services/axios",()=>({
  __esModule:true,
  default:{
    get:jest.fn(),
    post:jest.fn(),
  },
}));

const wrapper=({children})=>(
  <AuthProvider>{children}</AuthProvider>
)

describe("AuthContext",()=>{
  beforeEach(()=>{
    jest.clearAllMocks();
  });

  test("should load user profile",async()=>{
    api.get.mockResolvedValue({
      data:{
        user:{
          _id:"123",
          name:"Saif",
          email:"saif@gmail.com",
        },
      },
    });

    const {result}=renderHook(()=>useAuth(),{wrapper});

    expect(result.current.loading).toBe(true);

    await waitFor(()=>{
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toEqual({
      _id:"123",
      name:"Saif",
      email:"saif@gmail.com",
    });

    expect(api.get).toHaveBeenCalledWith("/auth/profile");
  });

  test("set user to null when the profile request fail",async()=>{
    api.get.mockRejectedValue(new Error("Unauthorized"));

    const {result}=renderHook(()=>useAuth(),{wrapper});

    await waitFor(()=>{
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.user).toBe(null);
    expect(api.get).toHaveBeenCalledWith("/auth/profile");
  });

  test("should signup sucessfully",async()=>{
    api.get.mockResolvedValue({
      data:{user:null}
    });

    api.post.mockResolvedValue({
      data:{
        _id:"123",
        name:"Saif",
        email:"saif@gmail.com"
      }
    });

    const {result}=renderHook(()=>useAuth(),{wrapper});

    await waitFor(()=>{
      expect(result.current.loading).toBe(false);
    });

    await act(async()=>{
      await result.current.signup("Saif","saif@gmail.com","12345");
    });

    expect(result.current.user).toEqual({
      _id:"123",
      name:"Saif",
      email:"saif@gmail.com"
    });

    expect(api.post).toHaveBeenCalledWith("/auth/signup",{
      name:"Saif",
      email:"saif@gmail.com",
      password:"12345"
    });
  });

  test("should login succsessfully",async()=>{
    api.get.mockResolvedValue({
      data:{user:null}
    });

    api.post.mockResolvedValue({
      data:{
        _id:"123",
        name:"Saif",
        email:"saif@gmail.com"
      }
    });

    const {result}=renderHook(()=>useAuth(),{wrapper});

    await waitFor(()=>{
      expect(result.current.loading).toBe(false);
    });

    await act(async()=>{
      await result.current.login("saif@gmail.com","12345");
    });

    expect(result.current.user).toEqual({
      _id:"123",
      name:"Saif",
      email:"saif@gmail.com"
    });

    expect(api.post).toHaveBeenCalledWith("/auth/login",{
      email:"saif@gmail.com",
      password:"12345"
    });
  });

  test(" user should logout sucessfully",async()=>{
    api.get.mockResolvedValue({
      data:{
        user:{
          _id:"123",
          name:"Saif",
          email:"saif@gmail.com" }
      }
    });
    api.post.mockResolvedValue({
      data:{
        message:"Logout sucessfull"
      }
    });
    const {result}=renderHook(()=>useAuth(),{wrapper});
    await waitFor(()=>{
      expect(result.current.user).not.toBe(null);
    });

    await act(async()=>{
      await result.current.logout();
    });

    expect(result.current.user).toBe(null);
    expect(api.post).toHaveBeenCalledWith("/auth/logout");
  });
});