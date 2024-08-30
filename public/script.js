document.getElementById('fileInput').addEventListener('change', function() {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        fileNameDisplay.textContent = `Selected File: ${file.name}`;
    } else {
        fileNameDisplay.textContent = '';
    }
});

function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileName');
    const file = fileInput.files[0];
    const progressBar = document.getElementById('progressBar');
    const progressSection = document.getElementById('progressSection');
    const shareSection = document.getElementById('shareSection');

    if (file) {
        document.getElementById('fileInfo').innerText = `Uploading: ${file.name}`;
        document.getElementById('fileInfo').style.opacity = 1;

        // Show progress bar
        progressSection.style.display = 'block';
        progressBar.style.width = '0%';

        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload', true);

        xhr.upload.onprogress = function(event) {
            if (event.lengthComputable) {
                const progress = (event.loaded / event.total) * 100;
                progressBar.style.width = `${progress}%`;
            }
        };

        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const shareableLink = response.fileUrl;
                document.getElementById('shareableLink').value = shareableLink;
                shareSection.style.display = 'block';
                shareSection.style.opacity = 0;
                setTimeout(() => {
                    shareSection.style.opacity = 1;
                    shareSection.style.transition = 'opacity 0.6s ease';
                }, 100);
            } else {
                alert('File upload failed.');
            }
        };

        xhr.send(formData);
    } else {
        alert('Please select a file to upload.');
    }
}

function copyLink() {
    const link = document.getElementById('shareableLink');
    link.select();
    document.execCommand('copy');
    alert('Link copied to clipboard!');
}
