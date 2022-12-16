import localStore from "../stores/LocalStore";

const uploadImage = (image, callback, fail) => {
  let formData = new FormData();

  formData.append("myImage", image);

  fetch("/upload/uploadImage", {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.status === 200) {
      const reader = response.body.getReader();
      reader.read().then((res) => {
        let token = String.fromCharCode.apply(null, res.value);
        token = JSON.parse(token);
        //   localStore.actions.loginUser(token, callback, fail);
      });
    } else {
      console.log(response);
    }
  });
};


//https://stackoverflow.com/questions/1175347/how-can-i-select-and-upload-multiple-files-with-html-and-php-using-http-post
//https://stackoverflow.com/questions/39350040/uploading-multiple-files-with-multer
const requestAppointment = (images, appointment, callback, fail) => {
  let formData = new FormData(); 
  
  for (const image in images) {
    formData.append("myImage[]", images[image]);
  }

  console.log(appointment);

  fetch("/upload/uploadGallery", {
    method: "POST",
    body: formData,
  }).then((response) => {
    if (response.status === 200) {
      const reader = response.body.getReader();
      reader.read().then((res) => {
        let token = String.fromCharCode.apply(null, res.value);
        token = JSON.parse(token);
        //   localStore.actions.loginUser(token, callback, fail);
      });
      // console.log(response);

      fetch("/upload/uploadAppointment", {
        method: "POST",
        body: JSON.stringify(appointment),
        headers:{
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status === 200) {
          reader.read().then((res) => {
            let token = String.fromCharCode.apply(null, res.value);
            token = JSON.parse(token);
            //   localStore.actions.loginUser(token, callback, fail);
          });
          console.log(response);
        } else {
        }
      });

    } else {
      // console.log(response);
    }
  });
};

export default {
  requestAppointment,
};
