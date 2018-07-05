export default function JoinChat() {
  var pc = null;
  var dc = null;

  this.initJoiner = function(senderId, answerCallback, receivedMessageCallback) {
    pc = new RTCPeerConnection(null);

    pc.ondatachannel  = function(e) {dc = e.channel; dcInit(dc)};
    pc.onicecandidate = function(e) {
      if (e.candidate) return;
      console.log('generated answer I: ', JSON.stringify(pc.localDescription));
      answerCallback(senderId, JSON.stringify(pc.localDescription));
    };

    pc.oniceconnectionstatechange = function(e) {
      var state = pc.iceConnectionState
      if (state === "connected") {
        console.log('JoinChat: connected I');
      }
    };

    function dcInit(dc) {
      dc.onopen    = function()  {console.log('JoinChat: connected II');};
      dc.onmessage = function(e) {if (e.data) receivedMessageCallback(e.data);}
    }
  }

  this.createAnswerSDP = function(offerDSP) {
    var sdpConstraints = { optional: [{RtpDataChannels: true}]  };
    var offerDesc = new RTCSessionDescription(JSON.parse(offerDSP)); // JSON.parse($("#creater-sdp").val())
    pc.setRemoteDescription(offerDesc);
    pc.createAnswer(function (answerDesc) {
      console.log('generated answer II: ', JSON.stringify(answerDesc));
      pc.setLocalDescription(answerDesc);
      //answerCallback(senderId, JSON.stringify(answerDesc));
    }, function () {console.warn("Couldn't create offer")},sdpConstraints);
  }

  this.sendMSG = function(value) {
    dc.send(value);
  }

}
