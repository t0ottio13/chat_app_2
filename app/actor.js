const db_actor = firebase.firestore().collection('actor_06');

$('#actor_screen').html( '<img id="owl" src="./フクロウ.png">' );

//キャラクターの位置
let y = 0;
let x = 0;


// firebaseにキー操作を送る処理
//なにかキーが押されたとき、keydownfuncという関数を呼び出す
addEventListener("keydown", keyDownFunc);
//キーが押されたときに呼び出される関数
function keyDownFunc(event) {
    //押されたボタンに割り当てられた数値（すうち）を、key_codeに代入
    let key_code = event.keyCode;
    //「左ボタン」が押されたとき、xの値から32を引き算する
    if (key_code === 37) {
        // 左端で止まるように
        if (x > 0) {
            x -= 32;
        }
    }
    //「右ボタン」が押されたとき、xの値に32を足し算する
    if (key_code === 39) {
        // 右端で止まるように
        if (x < 544) {
            x += 32;
        }
    }
    if (key_code === 38) {
        y -= 32;
        document.getElementById('owl').style.top = y + "px";
        setTimeout(() => {
            y += 5;
            document.getElementById('owl').style.top = y + "px";
        }, 400);
        setTimeout(() => {
            y += 27;
            document.getElementById('owl').style.top = y + "px";
        }, 500);
    } 		//「上ボタン」が押されたとき、yの値から32を引き算する
    // 今回は横移動のみなので、下はなし。
    // if (key_code === 40) {
    //     y += 32;
    // } 		//「下ボタン」が押されたとき、yの値に32を足し算する
    console.log(x);
    if (x < 0) {
        x += 32;
    }
    //フクロウの画像の位置（いち）を反映（はんえい）させる
    db_actor.add({
        name: 'owl',
        x: x,
        y: y,
        time: firebase.firestore.FieldValue.serverTimestamp(),
    });
}

db_actor.orderBy('time','asc').onSnapshot((querySnapshot) => {
    const dataArray = [];
    querySnapshot.docs.forEach((docs) => {
        const data = {
            data: docs.data(),
        }
        dataArray.push(data);
    })
    console.log(dataArray);
    const fix_x = x + 'px';
    $('#owl').css('left', fix_x);
})

	document.getElementById( 'owl' ).style.top = y + "px";
    document.getElementById('owl').style.left = x + "px";
