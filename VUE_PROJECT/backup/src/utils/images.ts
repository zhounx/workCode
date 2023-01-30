function changeFileToBaseURL(file, fn) {
  var fileReader = new FileReader();
  if (file == undefined) return fn(null);
  fileReader.readAsDataURL(file);
  fileReader.onload = function () {
    var imgBase64Data = this.result;
    fn(imgBase64Data);
  };
}

function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function pressImg(param) {
  if (param && param.succ) {
    if (param.file == undefined) return param.succ(null);
    param.targetSize = param.hasOwnProperty("targetSize")
      ? param.targetSize
      : -1;
    param.width = param.hasOwnProperty("width") ? param.width : -1;
    param.fileName = param.hasOwnProperty("fileName")
      ? param.fileName
      : "image";
    param.quality = param.hasOwnProperty("quality") ? param.quality : 0.92;
    var _this = this;
    var fileType = param.file.type;
    if (fileType.indexOf("image") == -1) {
      console.log("请选择图片文件^_^");
      return param.succ(null);
    }
    var size = param.file.size;
    if (param.targetSize > size) {
      return param.succ(param.file);
    }
    changeFileToBaseURL(param.file, function (base64) {
      if (base64) {
        var image = new Image();
        image.src = base64;
        image.onload = function () {
          var scale = this.width / this.height;

          var canvas = document.createElement("canvas");
          var context = canvas.getContext("2d");
          canvas.width = param.width == -1 ? this.width : param.width;
          canvas.height =
            param.width == -1 ? this.height : parseInt(param.width / scale);
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          var newImageData = canvas.toDataURL(fileType, param.quality);
          var resultFile = dataURLtoFile(newImageData, param.fileName);
          if (param.targetSize != -1 && param.targetSize < resultFile.size) {
            console.log("图片上传尺寸太大，请重新上传^_^");
            param.succ(null);
          } else {
            param.succ(resultFile);
          }
        };
      }
    });
  }
}
