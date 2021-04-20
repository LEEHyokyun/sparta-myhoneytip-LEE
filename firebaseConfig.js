import * as firebase from 'firebase/app';

// 사용할 파이어베이스 서비스 주석을 해제합니다
//import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
    //해당 부분은 생성된 파이어베이스 프로젝트에 따라 바뀌므로 수정필요!
    apiKey: "AIzaSyCzJa42BwaUeYiFkFpNV_w9MBL6EtmeFQI",
    authDomain: "sparta-myhoneytip-lee-e9bd8.firebaseapp.com",
    databaseURL: "https://sparta-myhoneytip-lee-e9bd8-default-rtdb.firebaseio.com",
    projectId: "sparta-myhoneytip-lee-e9bd8",
    storageBucket: "sparta-myhoneytip-lee-e9bd8.appspot.com",
    messagingSenderId: "152513192327",
    appId: "1:152513192327:web:84d905788bd04fabe17322",
    measurementId: "G-J3W4ZT7EKW"
};

//사용 방법입니다. 
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

//firebase_db 변수에 위 데이터를 하나로 담아서, 외부에서 접근할 수 있도록 설정.
//외부에서 사용하는 변수이름은 firebase_db 
export const firebase_db = firebase.database()