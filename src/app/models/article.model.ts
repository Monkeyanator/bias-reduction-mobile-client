export class Article{

  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;

  constructor(_id: string, _title: string, _description: string, _imageUrl: string, _link: string){
    this.id = _id;
    this.title = _title;
    this.description = _description;
    this.imageUrl = _imageUrl;
    this.link = _link; 
  }

}
