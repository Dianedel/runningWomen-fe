import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {
  uploader: FileUploader = new FileUploader({
    url: '/photos'
  });

  newPhoto = {
    name: '',
    brand: '',
    specs: []
  };

  feedback: string;

  constructor() { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  addSpec(spec) {
    this.newPhoto.specs.push(spec);
  }

  submit() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('name', this.newPhoto.name);
      form.append('brand', this.newPhoto.brand);
      form.append('specs', JSON.stringify(this.newPhoto.specs));
    };

    this.uploader.uploadAll();
  }

}
