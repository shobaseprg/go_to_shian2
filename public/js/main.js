'use strict';

let chatMessages = [];

const app = new Vue({
  el: '#app',
  data: {
    chatMessages: chatMessages
  }
});

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const collection = db.collection('messages');
const form = document.querySelector('form');
const submitBtn = document.getElementById('submit-button');

collection.orderBy('created').onSnapshot(snapshot => {/* messageCollectionに変化があった場合 */
  snapshot.docChanges().forEach(change => {/* snapshot.docChanges()の返り値は、コレクション自体 */
    if (change.type === 'added') {/* コレクションのデータ変化が追加出会った場合？ */
      chatMessages.push(change.doc.data().message)
    }
  });
});

submitBtn.addEventListener('click', e => {
  e.preventDefault();

  const val = message.value.trim();
  if (val === "") return;

  message.value = '';
  message.focus();

  collection.add({
    message: val,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })
    .catch(error => {
      console.log(error);
    });
});

message.focus();
