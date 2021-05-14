
// 日時をいい感じの形式にする関数
function convertFromFirestoreTimestampToDatetime(timestamp) {
    const _d = timestamp ? new Date(timestamp * 1000) : new Date();
    const Y = _d.getFullYear();
    const m = (_d.getMonth() + 1).toString().padStart(2, '0');
    const d = _d.getDate().toString().padStart(2, '0');
    const H = _d.getHours().toString().padStart(2, '0');
    const i = _d.getMinutes().toString().padStart(2, '0');
    const s = _d.getSeconds().toString().padStart(2, '0');
    return `${Y}/${m}/${d} ${H}:${i}:${s}`;
}

// 送信先のFirestoreの場所を指定する。
const db = firebase.firestore().collection('chat_06');
$('#send').on('click', function () {
    $('#name').val();
    $('#text').val();
    db.add({
        name: $('#name').val(),
        text: $('#text').val(),
        time: firebase.firestore.FieldValue.serverTimestamp(),
    });
    $('#text').val('');
})

// データベースから値をとってくる
db.orderBy('time', 'desc').onSnapshot((querySnapshot) => {
    // 空の配列を用意
    const dataArray = [];
    querySnapshot.docs.forEach((docs) => {
        const data = {
            id: docs.id,
            data: docs.data(),
        }
        dataArray.push(data);
    })
    const tagArray = [];
    dataArray.forEach((data) => {
        tagArray.push(`
            <li id=${data.id}>
                <p>${data.data.name}</p>
                <p>${data.data.text}</p>
            <p class="chat_date">${convertFromFirestoreTimestampToDatetime(data.data.time.seconds)}</p>
        </li>
        `)
    })
    $('#output').html(tagArray);
})