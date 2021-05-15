$('#actor_screen').html( '<img id="owl" src="./フクロウ.png">' );

//キャラクターの位置
let y = 0;
let x = 0;

//なにかキーが押されたとき、keydownfuncという関数を呼び出す
addEventListener( "keydown", keydownfunc );

//キーが押されたときに呼び出される関数
function keydownfunc( event ) {

	//押されたボタンに割り当てられた数値（すうち）を、key_codeに代入
	let key_code = event.keyCode;

	if( key_code === 37 ) x -= 32;		//「左ボタン」が押されたとき、xの値から32を引き算する
	if( key_code === 38 ) y -= 32;		//「上ボタン」が押されたとき、yの値から32を引き算する
	if( key_code === 39 ) x += 32;		//「右ボタン」が押されたとき、xの値に32を足し算する
	if( key_code === 40 ) y += 32;		//「下ボタン」が押されたとき、yの値に32を足し算する

	//フクロウの画像の位置（いち）を反映（はんえい）させる
	document.getElementById( 'owl' ).style.top = y + "px";
    document.getElementById('owl').style.left = x + "px";
}