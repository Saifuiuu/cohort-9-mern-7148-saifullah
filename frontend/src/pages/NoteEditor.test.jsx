import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import NoteEditor from "./NoteEditor";
import api from "../services/axios";
import { useNavigate, useParams } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("../services/axios", () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  },
}));

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock("react-quill-new",()=>({
  __esModule:true,
  default:({value,onChange,placeholder,id})=>(
    <textarea
      id={id}
      data-testid="quill-editor"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}/>),
}))

describe("NoteEditor",()=>{
  beforeEach(() => {
    jest.clearAllMocks()

    useNavigate.mockReturnValue(mockNavigate);

    useParams.mockReturnValue({
      id: undefined,
    })
  })

  test("renders create note form",()=>{

    render(<NoteEditor />)
    expect(
      screen.getByRole("heading",{
        name: "creating a new note",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Title")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("quill-editor")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Create Note",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Cancel",
      })
    ).toBeInTheDocument();
  });


  test("allows user to enter title and content",()=>{
    render(<NoteEditor/>);

    const titleInput=screen.getByLabelText("Title");

    const contentInput =
      screen.getByTestId("quill-editor");

    fireEvent.change(titleInput,{
      target: {
        value: "My first note", },
    })

    fireEvent.change(contentInput, {
      target: {
        value: "This is my note content",
      },
    });

    expect(titleInput).toHaveValue("My first note");

    expect(contentInput).toHaveValue(
      "This is my note content"
    );
  });

  test("creates a new note successfully", async () => {
    try {
       api.post.mockResolvedValue({
      data: {
        message: "Note created successfully",
      },
    });

    render(<NoteEditor />);

    fireEvent.change(
      screen.getByLabelText("Title"),
      {
        target: {
          value: "New Note",
        },
      }
    );

    fireEvent.change(
      screen.getByTestId("quill-editor"),
      {
        target: {
          value: "New note content",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Note",
      })
    );

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(
        "/note",
        {
          title: "New Note",
          content: "New note content",
        }
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith(
      "/dashboard"
    );
  
    } catch (error) {
      throw new Error(`test faild ${error.message}`)
    }})
   

  test("shows error when creating note fails",async()=>{
try {
  api.post.mockRejectedValue({
      response: {
        data: {
          message: "Failed to create note",
        },
      },
    });

    render(<NoteEditor />);

    fireEvent.change(
      screen.getByLabelText("Title"),
      {
        target: {
          value: "New Note",
        },
      }
    );

    fireEvent.change(
      screen.getByTestId("quill-editor"),
      {
        target: {
          value: "Content",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Note",
      }))

    expect(
      await screen.findByText(
        "Failed to create note")
    ).toBeInTheDocument();

    expect(mockNavigate).not.toHaveBeenCalledWith(
      "/dashboard")

} catch (error) {
  throw new Error(`test faild ${error.message}`)
}})


  test("loads existing note in edit mode",async()=>{
    try {
    useParams.mockReturnValue({
      id: "123",})

    api.get.mockResolvedValue({
      data: {
        title: "Existing Note",
        content: "Existing note content", },
    })

    render(<NoteEditor />)
    expect(
      await screen.findByDisplayValue("Existing Note")
    ).toBeInTheDocument()
    expect(
      screen.getByTestId("quill-editor")
    ).toHaveValue("Existing note content")
    expect(api.get).toHaveBeenCalledWith(
      "/note/123")

    expect(
      screen.getByRole("heading", {
        name: "Edit Note",
      })
    ).toBeInTheDocument()  
    } catch (error) {
      throw new Error(`test faild ${error.message}`)}
  })

  test("shows error when existing note cannot be loaded",async()=>{
    try {   
    useParams.mockReturnValue({
      id: "123",})

    api.get.mockRejectedValue({
      response:{
        data:{
          message: "Note not found", },
           },})

    render(<NoteEditor />)

    expect(
      await screen.findByText("Note not found")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Title")
    ).toBeDisabled();

    expect(
      screen.getByRole("button", {
        name: "Update Note",
      })
    ).toBeDisabled();
  
    } catch (error) {
      throw new Error(`test faild ${error.message}`)
    }
    });

  test("updates existing note successfully",async()=>{
    try {
    useParams.mockReturnValue({
      id: "123",
    })

    api.get.mockResolvedValue({
      data: {
        title: "Old title",
        content: "Old content",
      },})

    api.put.mockResolvedValue({
      data: {
        message: "Note updated successfully",
      },})

    render(<NoteEditor />)

    const titleInput =
      await screen.findByDisplayValue("Old title");

    const contentInput =
      screen.getByTestId("quill-editor")

    fireEvent.change(titleInput, {
      target: {
        value: "Updated title",
      },})

    fireEvent.change(contentInput, {
      target: {
        value: "Updated content",
      },})

    fireEvent.click(
      screen.getByRole("button",{
        name: "Update Note",
      }))

    await waitFor(()=>{
      expect(api.put).toHaveBeenCalledWith(
        "/note/123",
        {
          title: "Updated title",
          content: "Updated content",
        })})

    expect(mockNavigate).toHaveBeenCalledWith(
      "/dashboard" )
} catch (error) {
       throw new Error(`test faild ${error.message}`)
    }})

  test("shows error when updating note fails",async()=>{

    try {
      
    useParams.mockReturnValue({
      id: "123",})

    api.get.mockResolvedValue({
      data: {
        title: "Old title",
        content: "Old content",
      },})

    api.put.mockRejectedValue({
      response:{
        data:{
          message:"Failed to update note",
        },},
    })

    render(<NoteEditor />)

    await screen.findByDisplayValue("Old title")

    fireEvent.click(
      screen.getByRole("button", {
        name: "Update Note",
      }))

    expect(
      await screen.findByText(
        "Failed to update note"
      )
    ).toBeInTheDocument()

    expect(mockNavigate).not.toHaveBeenCalledWith(
      "/dashboard"
    )} 
    catch (error) {
       throw new Error(`test faild ${error.message}`)}
    })
})