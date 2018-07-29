const input = document.querySelector('input');
const container = document.querySelector('#container');
input.addEventListener('change', () => {
    input.disabled = true;
    const reset = () => {
        input.disabled = false;
        input.value = ''; // リセット
    };
    for (let index = 0; index < input.files.length ; index++) {
        const file = input.files.item(index);
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            const url = reader.result;
            const item = container.cloneNode(true);
            item.querySelector('.filename').textContent = file.name;
            item.querySelector('.icon').src = url;
            item.querySelector('.code').value = `item?.imageUrl = '${url}';`;
            item.querySelector('.copy').addEventListener('click', copy);
            item.querySelector('.regenerate').addEventListener('click', () => {
                item.querySelector('.code').value = `item?.imageUrl = '${url}';`;
            });
            item.classList.remove('hidden');
            document.body.appendChild(item);
            reset();
        });
        reader.addEventListener('error', reset);
        reader.readAsDataURL(file);
    }
});

function copy(event) {
    const textarea = event.target.parentNode.querySelector('.code');
    const [varName, suffix] = textarea.value.split('.');
    if (!varName) {
        alert('コードの生成に失敗したようです');
    } else if (varName.includes('?')) {
        alert('名前に ? が入ったままです！使い方を読んでください');
    } else if (!suffix) {
        alert('「.（ドット）」が見当たりません。消していませんか？困ったときは再生成しましょう');
    } else {
        textarea.select();
        document.execCommand('copy');
        alert('コピーされました！');        
    }
}
