import configuration from './stun';

export default function ChatCreator() {
  var pc = null;
  var dc = null;

  this.initCreator = function(senderId, offerCallback, receivedMessageCallback){
    pc = new RTCPeerConnection(configuration);

    pc.oniceconnectionstatechange = function(e) {
      var state = pc.iceConnectionState;
      console.log('create: state: ', state);
    };

    pc.onicecandidate = function(e) {
      if (e.candidate) return;
      console.log('inside onicecandidate, callback: ', JSON.stringify(pc.localDescription));
      console.log('offerCallback: ', offerCallback);
      offerCallback(senderId, JSON.stringify(pc.localDescription));
    }

    dc = pc.createDataChannel("chat");

    pc.createOffer().then(function(e) {
      pc.setLocalDescription(e)
    });

    dc.onopen = function(){
      console.log('create: CONNECTED!');
    };

    dc.onmessage = function(e) {
      if (e.data) {
        console.log('received message: ', e.data);
        receivedMessageCallback(e.data);
      }
    }
  }

  this.start = function(answerSDP){
    var answerDesc = new RTCSessionDescription(JSON.parse(answerSDP));
    pc.setRemoteDescription(answerDesc);
  }

  this.sendMSG = function(value) {
    dc.send(value);
  }
}
