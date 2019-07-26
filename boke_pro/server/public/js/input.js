function test() {
    let data = CKEDITOR.instances.content.getData();
    console.log(data);
}
CKEDITOR.replace('content');
topRightInit();