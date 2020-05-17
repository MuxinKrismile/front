export class AddNote {
  constructor(uid, cid, content) {
    this.uid = uid;
    this.cid = cid;
    this.content = content;
  }

  uid: number;
  cid: number;
  content: any;
}
