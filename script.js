/* This code is the property of 10xCoderKids and is aprotected with Copyright laws. All rights are reserved. Any unauthorized use is liable to prosecution under the local and international Copyright laws */

"use strict";

var c0 = ["wr", "wk", "wb", "wking", "wq", "wb", "wk", "wr"];
var c1 = ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"];
var c2 = ["", "", "", "", "", "", "", ""];
var c3 = ["", "", "", "", "", "", "", ""];
var c4 = ["", "", "", "", "", "", "", ""];
var c5 = ["", "", "", "", "", "", "", ""];
var c6 = ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"];
var c7 = ["br", "bk", "bb", "bking", "bq", "bb", "bk", "br"];
var r = [c0, c1, c2, c3, c4, c5, c6, c7];

var pMoves = [];
var pM_flag = 1;

var mLock = 0;
var bValue = "";
var imageId = "";
var imageBC = "";
var mCount = 1;

var checkLock = 0;
var imageId_CheckLock = "";

var gameOverLock = 0;

var wr00FMLock = 0;
var wr07FMLock = 0;
var wKingCastlingLock = 0;
var wKingSideCastlingLock = 0;
var wQueenSideCastlingLock = 0;

var br70FMLock = 0;
var br77FMLock = 0;
var bKingCastlingLock = 0;
var bKingSideCastlingLock = 0;
var bQueenSideCastlingLock = 0;

var wEnPassantPartialLock = 0;
var wEnPassantLock = 0;
var wEnPassant_NotAllowed = 0;
var imageId_wEnPassantLock = "";
var imageBC_wEnPassantLock = "";
var wEnPassant_Left = 0;
var wEnPassant_Right = 0;
var wEnPassant_Both = 0;

var bEnPassantPartialLock = 0;
var bEnPassantLock = 0;
var bEnPassant_NotAllowed = 0;
var imageId_bEnPassantLock = "";
var imageBC_bEnPassantLock = "";
var bEnPassant_Left = 0;
var bEnPassant_Right = 0;
var bEnPassant_Both = 0;

board();

function board() {
  var navigationButtons = "";

  navigationButtons += "<button id='header'>CHESS</button><br>";

  var fBlk = "white";
  var j = 0;
  var k = 0;

  for (var i = 1; i <= 64; i++) {
    var cToggle = fBlk;
    if (i % 2 === 0) {
      if (cToggle === "white") {
        cToggle = "black";
      }
      else {
        cToggle = "white";
      }
    }

    navigationButtons += "<button id='b" + j + k + "' class='" + cToggle + "' onclick='move(" + j + ", " + k + ", " + "r[" + j + "][" + k + "]" + ")'><img id='" + j + k + "' class='image' src='./images/" + j + k + ".jpg'/></button>";

    k++;
    if (i % 8 === 0) {
      navigationButtons += "<br>";
      fBlk = "black";
      j++;
      k = 0;
    }
    if (i % 16 === 0) {
      fBlk = "white";
    }
  }

  navigationButtons += "<a href='http://www.10xCoderKids.com' target='_blank'><button id='footer'>Ⓒ 10xCoderKidsᵀᴹ</button></a>";
  navigationButtons += "<a href='mailto:10xCoderKids@gmail.com?subject=Report Problem' target='_blank'><button id='report'>Report Problem</button></a>";

  var element = document.getElementById("board");
  element.innerHTML = navigationButtons;
}

function move(bx, by, bv) {
  if (mLock === 0) {
    if ((mCount % 2 === 1 && r[bx][by].substring(0, 1) === "w") || (mCount % 2 === 0 && r[bx][by].substring(0, 1) === "b")) {
      checkCastlingConditions(bx, by, bv);
      enPassantConditions(bx, by, bv);
      pMoves = [];
      pM(bx, by, bv);
      bValue = r[bx][by];
      imageId = bx.toString() + by.toString();
      if ((bx + by) % 2 === 0) {
        imageBC = "_1";
      }
      else {
        imageBC = "_0";
      }
      r[bx][by] = "";
      mLock = 1;
      var element = document.getElementById(imageId);
      element.style.border = "5px dotted green";
    }
  }
  if (mLock === 1) {
    if (pMoves.indexOf(bx.toString() + by.toString()) >= 0) {
      var element = document.getElementById(imageId);
      element.src = "./images/" + imageBC + ".jpg";
      element.style.border = "0px dotted green";
      r[bx][by] = bValue;
      imageId = bx.toString() + by.toString();
      if ((bx + by) % 2 === 0) {
        imageBC = "_1";
      }
      else {
        imageBC = "_0";
      }
      var element1 = document.getElementById(imageId);
      element1.src = "./images/" + bValue + imageBC + ".jpg";

      gameOverCheck();
      checkAlert(bx, by, r[bx][by]);
      checkCastlingConditions(bx, by, bv);
      castling();
      pawnPromotion();
      enPassantConditions(bx, by, r[bx][by]);
      enPassant(bx, by, bv);

      mCount++;
      mLock = 0;
    }
  }
}

function gameOverCheck() {
  var j = 0;
  var k = 0;
  var x1 = 0;
  var y1 = 0;
  pMoves = [];
  if (mCount % 2 === 0) {
    for (var i = 1; i <= 64; i++) {
      if (r[j][k].substring(0, 1) === "w") {
        pM(j, k, r[j][k]);
      }
      k++;
      if (i % 8 === 0){
        j++;
        k = 0;
      }
    }
    for (var i = 0; i < pMoves.length; i++) {
      x1 = pMoves[i].substring(0, 1);
      y1 = pMoves[i].substring(1);
      if (r[x1][y1] === "bking") {
        var element = document.getElementById(pMoves[i]);
        element.style.border = "5px dotted red";
        alert("Game Over");
        location.reload();
      }
    }
  }
  if (mCount % 2 === 1) {
    for (var i = 1; i <= 64; i++) {
      if (r[j][k].substring(0, 1) === "b") {
        pM(j, k, r[j][k]);
      }
      k++;
      if (i % 8 === 0){
        j++;
        k = 0;
      }
    }
    for (var i = 0; i < pMoves.length; i++) {
      x1 = pMoves[i].substring(0, 1);
      y1 = pMoves[i].substring(1);
      if (r[x1][y1] === "wking") {
        var element = document.getElementById(pMoves[i]);
        element.style.border = "5px dotted red";
        alert("Game Over");
        location.reload();
      }
    }
  }
}

function checkAlert(bx, by, bv) {
  if (checkLock === 1) {
    var element = document.getElementById(imageId_CheckLock);
    element.style.border = "0px dotted red";
    checkLock = 0;
    return;
  }
  if (checkLock === 0) {
    var m = 0;
    var n = 0;
    var x = 0;
    var y = 0;
    pMoves = [];
    if (mCount % 2 === 0) {
      for (var i = 1; i <= 64; i++) {
        if (r[m][n].substring(0, 1) === "b") {
          pM(m, n, r[m][n]);
        }
        n++;
        if (i % 8 === 0){
          m++;
          n = 0;
        }
      }
      for (var i = 0; i < pMoves.length; i++) {
        x = pMoves[i].substring(0, 1);
        y = pMoves[i].substring(1);
        if (r[x][y] === "wking") {
          var element = document.getElementById(pMoves[i]);
          element.style.border = "5px dotted red";
          imageId_CheckLock = pMoves[i];
          checkLock = 1;
        }
      }
    }
    if (mCount % 2 === 1) {
      for (var i = 1; i <= 64; i++) {
        if (r[m][n].substring(0, 1) === "w") {
          pM(m, n, r[m][n]);
        }
        n++;
        if (i % 8 === 0){
          m++;
          n = 0;
        }
      }
      for (var i = 0; i < pMoves.length; i++) {
        x = pMoves[i].substring(0, 1);
        y = pMoves[i].substring(1);
        if (r[x][y] === "bking") {
          var element = document.getElementById(pMoves[i]);
          element.style.border = "5px dotted red";
          imageId_CheckLock = pMoves[i];
          checkLock = 1;
        }
      }
    }
  }
}

function checkCastlingConditions(bx, by, bv) {
  if (mLock === 0) {
    var j = 0;
    var k = 0;
    if (bv === "wking") {
      pMoves = [];
      for (var i = 1; i <= 64; i++) {
        if (r[j][k].substring(0, 1) === "b") {
          pM(j, k, r[j][k]);
        }
        k++;
        if (i % 8 === 0){
          j++;
          k = 0;
        }
      }
      for (var i = 0; i < pMoves.length; i++) {
        if (pMoves[i] === "01" || pMoves[i] === "02" || pMoves[i] === "03") {
          wKingSideCastlingLock = 1;
        }
        if (pMoves[i] === "03" || pMoves[i] === "04" || pMoves[i] === "05" ) {
          wQueenSideCastlingLock = 1;
        }
      }
    }
    if (bv === "bking") {
      pMoves = [];
      for (var i = 1; i <= 64; i++) {
        if (r[j][k].substring(0, 1) === "w") {
          pM(j, k, r[j][k]);
        }
        k++;
        if (i % 8 === 0){
          j++;
          k = 0;
        }
      }
      for (var i = 0; i < pMoves.length; i++) {
        if (pMoves[i] === "71" || pMoves[i] === "72" || pMoves[i] === "73") {
          bKingSideCastlingLock = 1;
        }
        if (pMoves[i] === "73" || pMoves[i] === "74" || pMoves[i] === "75" ) {
          bQueenSideCastlingLock = 1;
        }
      }
    }
    if (bx === 0 && by === 0 && bv === "wr") {
      wr00FMLock = 1;
    }
    if (bx === 0 && by === 7 && bv === "wr") {
      wr07FMLock = 1;
    }
    if (bx === 7 && by === 0 && bv === "br") {
      br70FMLock = 1;
    }
    if (bx === 7 && by === 7 && bv === "br") {
      br77FMLock = 1;
    }
  }
  if (mLock === 1) {
    if (bValue === "wking") {
      if (!((bx === 0 && by === 1) || (bx === 0 && by === 5))) {
          wKingCastlingLock = 1;
      }
    }
    if (bValue === "bking") {
      if (!((bx === 7 && by === 1) || (bx === 7 && by === 5))) {
          bKingCastlingLock = 1;
      }
    }
  }
}

function castling() {
  if (wKingCastlingLock === 0) {
    if (wr00FMLock === 0) {
      if (r[0][1] === "wking" && r[0][0] === "wr") {
        var element = document.getElementById("02");
        element.src = "./images/wr_1.jpg";

        var element1 = document.getElementById("00");
        element1.src = "./images/_1.jpg";

        r[0][2] = "wr";
        r[0][0] = "";
        wKingCastlingLock = 1;
      }
    }
    if (wr07FMLock === 0) {
      if (r[0][5] === "wking" && r[0][7] === "wr") {
        var element = document.getElementById("04");
        element.src = "./images/wr_1.jpg";

        var element1 = document.getElementById("07");
        element1.src = "./images/_0.jpg";

        r[0][4] = "wr";
        r[0][7] = "";
        wKingCastlingLock = 1;
      }
    }
  }

  if (bKingCastlingLock === 0) {
    if (br70FMLock === 0) {
      if (r[7][1] === "bking" && r[7][0] === "br") {
        var element = document.getElementById("72");
        element.src = "./images/br_0.jpg";

        var element1 = document.getElementById("70");
        element1.src = "./images/_0.jpg";

        r[7][2] = "br";
        r[7][0] = "";
        bKingCastlingLock = 1;
      }
    }
    if (br77FMLock === 0) {
      if (r[7][5] === "bking" && r[7][7] === "br") {
        var element = document.getElementById("74");
        element.src = "./images/br_0.jpg";

        var element1 = document.getElementById("77");
        element1.src = "./images/_1.jpg";

        r[7][4] = "br";
        r[7][7] = "";
        bKingCastlingLock = 1;
      }
    }
  }
}

function pawnPromotion() {
  var j = 7;
  for (var i = 0; i <= 7; i++) {
    if (r[j][i] === "wp") {
      r[j][i] = "wq";
      imageId = j.toString() + i.toString();
      var element = document.getElementById(imageId);
      element.src = "./images/wq" + imageBC + ".jpg";
      checkAlert(j, i, r[j][i]);
    }
  }
  var m = 0;
  for (var i = 0; i <= 7; i++) {
    if (r[m][i] === "bp") {
      r[m][i] = "bq";
      imageId = m.toString() + i.toString();
      var element = document.getElementById(imageId);
      element.src = "./images/bq" + imageBC + ".jpg";
      checkAlert(m, i, r[m][i]);
    }
  }
}

function enPassantConditions(bx, by, bv) {
  if (mLock === 0) {
    if (wEnPassant_NotAllowed === 1) {
      wEnPassant_Left = 0;
      wEnPassant_Right = 0;
      wEnPassant_Both = 0;
      wEnPassantPartialLock = 0;
      wEnPassantLock = 0;
    }
    if (bx === 6 && bv === "bp") {
      wEnPassantPartialLock = 1;
      wEnPassant_NotAllowed = 0;
    }
    if ((wEnPassant_Right === 1 || wEnPassant_Left === 1) && bx === 4 && bv === "wp") {
      wEnPassantLock = 1;
    }

    if (bEnPassant_NotAllowed === 1) {
      bEnPassant_Left = 0;
      bEnPassant_Right = 0;
      bEnPassant_Both = 0;
      bEnPassantPartialLock = 0;
      bEnPassantLock = 0;
    }
    if (bx === 1 && bv === "wp") {
      bEnPassantPartialLock = 1;
      bEnPassant_NotAllowed = 0;
    }
    if ((bEnPassant_Right === 1 || bEnPassant_Left === 1) && bx === 3 && bv === "bp") {
      bEnPassantLock = 1;
    }
  }

  if (mLock === 1) {
    if (bx > 4 && bv === "bp") {
      wEnPassantPartialLock = 0;
      wEnPassantLock = 0;
      wEnPassant_NotAllowed = 1;
    }
    if (wEnPassantPartialLock === 1 && bx === 4 && bv === "bp") {
      wEnPassant_Both = 0;
      wEnPassant_NotAllowed = 0;
      var y = 0;
      y = by;
      y--;
      if (y >= 0) {
        if (r[bx][y] === "wp") {
          wEnPassant_Right = 1;
          imageId_wEnPassantLock = imageId;
          imageBC_wEnPassantLock = imageBC;
        }
      }
      y = by;
      y++;
      if (y <= 7) {
        if (r[bx][y] === "wp") {
          wEnPassant_Left = 1;
          imageId_wEnPassantLock = imageId;
          imageBC_wEnPassantLock = imageBC;
        }
      }
      if (wEnPassant_Right === 1 && wEnPassant_Left === 1) {
      wEnPassant_Both = 1;
      }
    }
    else {
      wEnPassant_NotAllowed = 1;
    }

    if (bx < 3 && bv === "wp") {
      bEnPassantPartialLock = 0;
      bEnPassantLock = 0;
      bEnPassant_NotAllowed = 1;
    }
    if (bEnPassantPartialLock === 1 && bx === 3 && bv === "wp") {
      bEnPassant_Both = 0;
      bEnPassant_NotAllowed = 0;
      var y = 0;
      y = by;
      y--;
      if (y >= 0) {
        if (r[bx][y] === "bp") {
          bEnPassant_Right = 1;
          imageId_bEnPassantLock = imageId;
          imageBC_bEnPassantLock = imageBC;
        }
      }
      y = by;
      y++;
      if (y <= 7) {
        if (r[bx][y] === "bp") {
          bEnPassant_Left = 1;
          imageId_bEnPassantLock = imageId;
          imageBC_bEnPassantLock = imageBC;
        }
      }
      if (bEnPassant_Right === 1 && bEnPassant_Left === 1) {
      bEnPassant_Both = 1;
      }
    }
    else {
      bEnPassant_NotAllowed = 1;
    }
  }
}

function enPassant(bx, by, bv) {
  if (wEnPassantLock === 1) {
    if ((bx === Number(imageId_wEnPassantLock.substring(0, 1)) + 1) && by == imageId_wEnPassantLock.substring(1)) {
      var element = document.getElementById(imageId_wEnPassantLock);
      element.src = "./images/" + imageBC_wEnPassantLock + ".jpg";

      r[imageId_wEnPassantLock.substring(0, 1)][imageId_wEnPassantLock.substring(1)] = "";
    }
    wEnPassantLock = 0;
    wEnPassantPartialLock = 0;
    wEnPassant_NotAllowed = 0;
    wEnPassant_Left = 0;
    wEnPassant_Right = 0;  
    wEnPassant_Both = 0; 
  }
  if (bEnPassantLock === 1) {
    if ((bx === Number(imageId_bEnPassantLock.substring(0, 1)) - 1) && by == imageId_bEnPassantLock.substring(1)) {
      var element = document.getElementById(imageId_bEnPassantLock);
      element.src = "./images/" + imageBC_bEnPassantLock + ".jpg";

      r[imageId_bEnPassantLock.substring(0, 1)][imageId_bEnPassantLock.substring(1)] = "";
    }
    bEnPassantLock = 0;
    bEnPassantPartialLock = 0;
    bEnPassant_NotAllowed = 0;
    bEnPassant_Left = 0;
    bEnPassant_Right = 0;  
    bEnPassant_Both = 0; 
  }
}

function pM(bx, by, bv) {
  var xy = "";
  var x = "";
  var y = "";

  switch (bv) {
    case "wr":
      {
        pM_flag = 1;
        x = bx;
        y = by;
        x--;
        while (x >= 0) {
          pM_ifn(x, y, bv);
          x--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x++;
        while (x <= 7) {
          pM_ifn(x, y, bv);    
          x++;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        while (y >= 0) {
          pM_ifn(x, y, bv); 
          y--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        while (y <= 7) {
          pM_ifn(x, y, bv); 
          y++;
        }

        break;
      }

    case "br":
      {
        pM_flag = 1;
        x = bx;
        y = by;
        x--;
        while (x >= 0 ) {
          pM_ifn(x, y, bv); 
          x--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x++;
        while (x <= 7) {
          pM_ifn(x, y, bv);
          x++;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        while (y >= 0) {
          pM_ifn(x, y, bv); 
          y--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        while (y <= 7) {
          pM_ifn(x, y, bv); 
          y++;
        }

        break;
      }

    case "wk":
      {
        pM_flag = 1;
        x = bx;
        y = by;
        x -= 2;
        y--;
        if (x >= 0 && y >= 0) { 
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x -= 2;
        y++;
        if (x >= 0 && y <= 7) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x += 2;
        y--;
        if (x <= 7 && y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x += 2;
        y++;
        if (x <= 7 && y <= 7) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y -= 2;
        x--;
        if (x >= 0 && y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y -= 2;
        x++;
        if (x <= 7 && y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y += 2;
        x--;
        if (x >= 0 && y <= 7) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y += 2;
        x++;
        if (x <= 7 && y <= 7) {
          pM_ifn(x, y, bv);
        }

        break;
      }

    case "bk":
      {
        pM_flag = 1;
        x = bx;
        y = by;
        x -= 2;
        y--;
        if (x >= 0 && y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x -= 2;
        y++;
        if (x >= 0 && y <= 7) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x += 2;
        y--;
        if (x <= 7 && y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x += 2;
        y++;
        if (x <= 7 && y <= 7) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y -= 2;
        x--;
        if (x >= 0 && y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y -= 2;
        x++;
        if (x <= 7 && y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y += 2;
        x--;
        if (x >= 0 && y <= 7) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y += 2;
        x++;
        if (x <= 7 && y <= 7) {
          pM_ifn(x, y, bv);
        }

        break;
      }

    case "wb":
      {
        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        x--;
        while (x >= 0 && y >= 0) {
          pM_ifn(x, y, bv);
          y--;
          x--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        x--;
        while (x >= 0 && y <= 7) {
          pM_ifn(x, y, bv);
          y++;
          x--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        x++;
        while (y >= 0 && x <= 7) {
          pM_ifn(x, y, bv);
          y--;
          x++;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        x++;
        while (x <= 7 && y <= 7) {
          pM_ifn(x, y, bv);
          y++;
          x++;
        }

        break;
      }

    case "bb":
      {
        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        x--;
        while (x >= 0 && y >= 0) {
          pM_ifn(x, y, bv);
          y--;
          x--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        x--;
        while (x >= 0 && y <= 7) {
          pM_ifn(x, y, bv);
          y++;
          x--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        x++;
        while (y >= 0 && x <= 7) {
          pM_ifn(x, y, bv);
          y--;
          x++;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        x++;
        while (x <= 7 && y <= 7) {
          pM_ifn(x, y, bv);
          y++;
          x++;
        }

        break;
      }

    case "wking":
      {
        if (wKingCastlingLock === 0) {
          if (wKingSideCastlingLock === 0) {
            if (wr00FMLock === 0) {
              if (r[0][3] === "wking" && r[0][2] === "" && r[0][1] === "" && r[0][0] === "wr") {
                pMoves.push("01");
              }
            }
          }
          if (wQueenSideCastlingLock === 0) {
            if (wr07FMLock === 0) {
              if (r[0][3] === "wking" && r[0][4] === "" && r[0][5] === "" && r[0][6] === "" && r[0][7] === "wr") {
                pMoves.push("05");
              }
            }
          }
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x--;
        y--;
        if (x >= 0 && y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x--;
        y++;
        if (x >= 0 && y <= 7) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x++;
        y--;
        if (x <= 7 && y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x++;
        y++;
        if (x <= 7 && y <= 7) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x--;
        if (x >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x++;
        if (x <= 7) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        if (y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        if (y <= 7) {
          pM_ifn(x, y, bv);
        }

        break;
      }

    case "bking":
      {
        if (bKingCastlingLock === 0) {
          if (bKingSideCastlingLock === 0) {
            if (br70FMLock === 0) {
              if (r[7][3] === "bking" && r[7][2] === "" && r[7][1] === "" && r[7][0] === "br") {
                pMoves.push("71");
              }
            }
          }
          if (bQueenSideCastlingLock === 0) {
            if (br77FMLock === 0) {
              if (r[7][3] === "bking" && r[7][4] === "" && r[7][5] === "" && r[7][6] === "" && r[7][7] === "br") {
                pMoves.push("75");
              }
            }
          }
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x--;
        y--;
        if (x >= 0 && y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x--;
        y++;
        if (x >= 0 && y <= 7) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x++;
        y--;
        if (x <= 7 && y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x++;
        y++;
        if (x <= 7 && y <= 7) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x--;
        if (x >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x++;
        if (x <= 7) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        if (y >= 0) {
          pM_ifn(x, y, bv);
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        if (y <= 7) {
          pM_ifn(x, y, bv);
        }

        break;
      }

    case "wq":
      {
        pM_flag = 1;
        x = bx;
        y = by;
        x--;
        while (x >= 0) {
          pM_ifn(x, y, bv);
          x--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x++;
        while (x <= 7) {
          pM_ifn(x, y, bv);
          x++;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        while (y >= 0) {
          pM_ifn(x, y, bv);
          y--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        while (y <= 7) {
          pM_ifn(x, y, bv);
          y++;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        x--;
        while (x >= 0 && y >= 0) {
          pM_ifn(x, y, bv);
          y--;
          x--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        x--;
        while (x >= 0 && y <= 7) {
          pM_ifn(x, y, bv);
          y++;
          x--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        x++;
        while (y >= 0 && x <= 7) {
          pM_ifn(x, y, bv);
          y--;
          x++;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        x++;
        while (x <= 7 && y <= 7) {
          pM_ifn(x, y, bv);
          y++;
          x++;
        }

        break;
      }

    case "bq":
      {
        pM_flag = 1;
        x = bx;
        y = by;
        x--;
        while (x >= 0) {
          pM_ifn(x, y, bv);
          x--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        x++;
        while (x <= 7) {
          pM_ifn(x, y, bv);
          x++;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        while (y >= 0) {
          pM_ifn(x, y, bv);
          y--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        while (y <= 7) {
          pM_ifn(x, y, bv);
          y++;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        x--;
        while (x >= 0 && y >= 0) {
          pM_ifn(x, y, bv);
          y--;
          x--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        x--;
        while (x >= 0 && y <= 7) {
          pM_ifn(x, y, bv);
          y++;
          x--;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y--;
        x++;
        while (y >= 0 && x <= 7) {
          pM_ifn(x, y, bv);
          y--;
          x++;
        }

        pM_flag = 1;
        x = bx;
        y = by;
        y++;
        x++;
        while (x <= 7 && y <= 7) {
          pM_ifn(x, y, bv);
          y++;
          x++;
        }

        break;
      }

    case "wp":
      {
        x = bx;
        y = by;
        x++;
        if (x <= 7) {
          if (r[x][y] === "") {
            xy = x.toString() + y.toString();
            pMoves.push(xy);
            x++;
            if (bx === 1 && r[x][y] === "") {
              xy = x.toString() + y.toString();
              pMoves.push(xy);
            }
          }
        }

        x = bx;
        y = by;
        if (wEnPassant_Both === 0) {
          if (wEnPassant_Left === 1) {
            if (y === Number(imageId_wEnPassantLock.substring(1)) + 1) {
              xy = (x+1).toString() + (y-1).toString();
              pMoves.push(xy);
            }
          }
        }

        x = bx;
        y = by;
        if (wEnPassant_Both === 0) {
          if (wEnPassant_Right === 1) {
            if (y === Number(imageId_wEnPassantLock.substring(1)) - 1) {
              xy = (x+1).toString() + (y+1).toString();
              pMoves.push(xy);
            }
          }
        }

        x = bx;
        y = by;
        if (wEnPassant_Both === 1) {
          xy = (Number(imageId_wEnPassantLock.substring(0, 1)) + 1).toString() + imageId_wEnPassantLock.substring(1);
          pMoves.push(xy);
        }

        x = bx;
        y = by;
        x++;
        y--;
        if (x <= 7 && y >= 0) {
          if (r[x][y].substring(0, 1) === "b") {
            xy = x.toString() + y.toString();
            pMoves.push(xy);
          }
        }

        x = bx;
        y = by;
        x++;
        y++;
        if (x <= 7 && y <= 7) {
          if (r[x][y].substring(0, 1) === "b") {
            xy = x.toString() + y.toString();
            pMoves.push(xy);
          }
        }

        break;
      }

    case "bp":
      {
        x = bx;
        y = by;
        x--;
        if (x >= 0) {
          if (r[x][y] === "") {
            xy = x.toString() + y.toString();
            pMoves.push(xy);
            x--;
            if (bx === 6 && r[x][y] === "") {
            xy = x.toString() + y.toString();
            pMoves.push(xy);
            }
          }
        }

        x = bx;
        y = by;
        if (bEnPassant_Both === 0) {
          if (bEnPassant_Left === 1) {
            if (y === Number(imageId_bEnPassantLock.substring(1)) + 1) {
              xy = (x-1).toString() + (y-1).toString();
              pMoves.push(xy);
            }
          }
        }

        x = bx;
        y = by;
        if (bEnPassant_Both === 0) {
          if (bEnPassant_Right === 1) {
            if (y === Number(imageId_bEnPassantLock.substring(1)) - 1) {
              xy = (x-1).toString() + (y+1).toString();
              pMoves.push(xy);
            }
          }
        }

        x = bx;
        y = by;
        if (bEnPassant_Both === 1) {
          xy = (Number(imageId_bEnPassantLock.substring(0, 1)) - 1).toString() + imageId_bEnPassantLock.substring(1);
          pMoves.push(xy);
        }

        x = bx;
        y = by;
        x--;
        y--;
        if (x >= 0 && y >= 0) {
          if (r[x][y].substring(0, 1) === "w") {
            xy = x.toString() + y.toString();
            pMoves.push(xy);
          }
        }

        x = bx;
        y = by;
        x--;
        y++;
        if (x >= 0 && y <= 7) {
          if (r[x][y].substring(0, 1) === "w") {
            xy = x.toString() + y.toString();
            pMoves.push(xy);
          }
        }

        break;
      }
  }
}

function pM_ifn(bx, by, bv) {
  var xy = "";
  var bssv1 = "";
  var bssv2 = "";

  if (bv.substring(0, 1) === "w") {
    bssv1 = "b";
    bssv2 = "w";
  }
  else if (bv.substring(0, 1) === "b") {
    bssv1 = "w";
    bssv2 = "b";
  }

  while (pM_flag) {
    if (r[bx][by] === "") {
      xy = bx.toString() + by.toString();
      pMoves.push(xy);
      break;
    }
    else if (r[bx][by].substring(0, 1) === bssv1) {
      xy = bx.toString() + by.toString();
      pMoves.push(xy);
      pM_flag = 0;
      break;
    }
    else if (r[bx][by].substring(0, 1) === bssv2) {
      pM_flag = 0;
      break;
    }
  }
}
