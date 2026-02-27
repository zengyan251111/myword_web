// MyWord 单词学习软件 JS 核心源码（完整可直接复用）
// 存储单词数据（本地存储，刷新页面不丢失）
let wordList = JSON.parse(localStorage.getItem('mywordList')) || [];

// 渲染单词列表
function renderWordList() {
    const wordListContainer = document.createElement('div');
    wordListContainer.className = 'word-list';
    wordListContainer.innerHTML = '';

    if (wordList.length === 0) {
        wordListContainer.innerHTML = '<p style="text-align:center; color:#666;">暂无单词，点击添加按钮新增单词吧~</p>';
        document.body.appendChild(wordListContainer);
        return;
    }

    wordList.forEach((word, index) => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordItem.innerHTML = `
            <strong>${word.english}</strong> - ${word.chinese}
            <div style="margin-top:5px;">
                <button onclick="editWord(${index})" style="padding:5px 10px; font-size:12px; margin-right:5px;">编辑</button>
                <button onclick="deleteWord(${index})" style="padding:5px 10px; font-size:12px; background-color:#f44336;">删除</button>
            </div>
        `;
        wordListContainer.appendChild(wordItem);
    });

    // 移除原有列表，添加新列表
    const oldList = document.querySelector('.word-list');
    if (oldList) oldList.remove();
    document.body.appendChild(wordListContainer);
}

// 添加单词
function addWord() {
    const english = prompt('请输入英文单词：');
    const chinese = prompt('请输入单词中文释义：');
    if (!english || !chinese) {
        alert('英文单词和中文释义都不能为空哦~');
        return;
    }
    wordList.push({ english, chinese });
    // 保存到本地存储
    localStorage.setItem('mywordList', JSON.stringify(wordList));
    renderWordList();
    alert('单词添加成功！');
}

// 编辑单词
function editWord(index) {
    const oldWord = wordList[index];
    const newEnglish = prompt('请输入修改后的英文单词：', oldWord.english);
    const newChinese = prompt('请输入修改后的中文释义：', oldWord.chinese);
    if (!newEnglish || !newChinese) {
        alert('英文单词和中文释义都不能为空哦~');
        return;
    }
    wordList[index] = { english: newEnglish, chinese: newChinese };
    localStorage.setItem('mywordList', JSON.stringify(wordList));
    renderWordList();
    alert('单词修改成功！');
}

// 删除单词
function deleteWord(index) {
    if (confirm('确定要删除这个单词吗？删除后无法恢复哦~')) {
        wordList.splice(index, 1);
        localStorage.setItem('mywordList', JSON.stringify(wordList));
        renderWordList();
        alert('单词删除成功！');
    }
}

// 页面加载时渲染单词列表
window.onload = function() {
    // 添加添加单词按钮
    const addBtn = document.createElement('button');
    addBtn.textContent = '添加单词';
    addBtn.style.margin = '20px auto';
    addBtn.style.display = 'block';
    addBtn.onclick = addWord;
    document.body.appendChild(addBtn);

    // 渲染单词列表
    renderWordList();
};

// 暴露函数到全局，确保按钮点击可调用
window.addWord = addWord;
window.editWord = editWord;
window.deleteWord = deleteWord;