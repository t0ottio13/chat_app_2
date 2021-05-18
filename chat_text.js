
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

// 送信先のFirestoreの場所を指定する。チャット用
const db = firebase.firestore().collection('chat_06');

// 送信先のFirestoreの場所を指定する。ログイン用
const birdBase = firebase.firestore().collection('login_06');

// 最初のログイン時の処理のため
let count = 0;

let tagActor = [];

// トリを選んだらログイン表示
$('select').change(() => {
    // チャットメッセージの送信
    db.add({
        name: $('#name').val(),
        text: 'ログインしました！',
        time: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // ログインしたトリの情報
    birdBase.doc('iUyVuARkRhq5rH6Bj7Lc').update({
        bird: firebase.firestore.FieldValue.arrayUnion($('#name').val()),
    });
    count++;
})

// 送信ボタンを押した後の処理
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
                <p class="chat_text_name">${data.data.name}</p>
                <p>${data.data.text}</p>
            <p class="chat_date">${convertFromFirestoreTimestampToDatetime(data.data.time.seconds)}</p>
        </li>
        `)
    })

    // ログイン前は、メッセージを表示させない
    // if (count == 0) {
    // } else {
        $("#" + dataArray[0].data.name + "_text").text(dataArray[0].data.text);
    // }
    // つぶやきを一定時間で消す処理
    setTimeout(() => {
        $("#"+dataArray[0].data.name + "_text").text("　");
    }, 2000);

    // チャット一覧に表示する
    $('#output').html(tagArray);
})

birdBase.onSnapshot((querySnapshot) => {
    const actorName = [];
    querySnapshot.docs.forEach((docs) => {
        const data = {
            id: docs.id,
            data: docs.data(),
        }
        actorName.push(data.data.bird);
        // console.log(data.data.bird);
        // console.log(actorName[0]);
    })
    tagActor = [];
    actorName[0].forEach(i => {
        tagActor.unshift(`
            <div class="actor_box">
                <p id= ${i}_text>　</p>
                <img src="./image/${i}.png">
            </div>
        `);
    })
    $('#actor_screen').html(tagActor);
})

// ログアウトの処理
$('#logout').on('click', function () {
    birdBase.doc('iUyVuARkRhq5rH6Bj7Lc').update({
        bird: firebase.firestore.FieldValue.arrayRemove($('#name').val()),
    });
})