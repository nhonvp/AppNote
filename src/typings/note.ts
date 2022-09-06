export interface NotePayload {
  type: string;
  noteId: string;
  title: string;
  content: string;
  image: string;
  groupId : string
}
export interface TypePayload {
  image: string;
  text: string;
}

export const TypeNote: TypePayload = {
  image: 'image',
  text: 'text',
};
