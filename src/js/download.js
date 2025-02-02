export default function setDownload(buttons) {
    if (!Array.isArray(buttons)) {
        buttons = [];
    }
    buttons.forEach((button) => button.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = button.dataset.link;
        link.download = 'filename.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }));
}