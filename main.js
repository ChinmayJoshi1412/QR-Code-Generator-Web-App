const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    clearUI();
    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if(url===''){
        alert('Please enter a URL');
    }else{
        showSpinner();

        setTimeout(()=>{
            hideSpinner();
            generateQRCode(url,size);
            setTimeout(()=>{
                const saveurl = qr.querySelector('img').src;
                createSaveBtn(saveurl)
            },50);
        },1000);
    }
});

const showSpinner = () =>{
    document.getElementById('spinner').style.display = 'block';
}
const hideSpinner = () =>{
    document.getElementById('spinner').style.display = 'none';
}

const generateQRCode = (url,size)=>{
    const qrcode = new QRCode('qrcode',{
        text:url,
        width:size,
        height:size
    });
}
hideSpinner();

const clearUI = ()=>{
    qr.innerHTML = "";
    const savebtn = document.getElementById('save-link');
    if(savebtn)
    {
        savebtn.remove();
    }
};

const createSaveBtn = (saveURL)=>{
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveURL;
    link.download = 'qrcode';
    link.innerHTML = 'Save Image';
    document.getElementById('generated').appendChild(link);
};