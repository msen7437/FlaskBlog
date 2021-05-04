function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
          b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var programmingLanguage = ["A#","A+","ABAP","ABC","Action","ActionScript","Active Oberon","ACUCOBOL","Ada","ADbasic","Adenine","AgentSheets & AgentCubes","Agilent VEE","AIMMS","Aldor","Alef","Aleph","ALGOL (ALGOL 60, ALGOL W, ALGOL 68)","Alice","AML","AmigaBASIC","AMOS BASIC","AMPL","AngelScript","Angular","ANSYS Parametric Design Language","Anweisungsliste (AWL)","A-0","APL","App Inventor","Applied Type System","AppleScript","Arden-Syntax","ARLA","ASIC","Atlas Transformation Language","Autocoder","AutoHotkey","AutoIt","AutoLISP","Automatically Programmed Tools (APT)","awk (awk, gawk, mawk, nawk)","B","B-0","BANCStar","BASIC","Basic Calculator","Batch","Bash","Basic Combined Programming Language (BCPL)","BeanShell","Befunge","Beta ","BLISS ","Blitz Basic","Boo","Brainfuck, Brainfuck2D","C","C++","C−−","C#","C/AL","Caml, siehe Objective CAML","CA-Realizer","Ceylon","C for graphics","Chef","CHILL","ChucK","CL","Clarion","Clean","Clipper","CLIPS","CLIST","Clojure","CLU","Cluster","Co-array Fortran","COBOL","Cobra","CoffeeScript","COMAL","Cω","COMIT","Common Lisp","Component Pascal","Comskee","CONZEPT 16","CPL","CSS/SCSS","CURL","Curry","CycL","Cython","D","DarkBASIC","Dart","Datalog","Delphi, siehe Object Pascal","Digital Command Language (DCL)","Dylan","Dynamo","E","Easytrieve","Eiffel","ELAN","Elixir","Elm","Emacs Lisp","Enterprise Generation Language (EGL)","Erlang","ESPOL","Esterel","Euler","Euphoria","EXAPT","F","F#","Factor","Faust","FileMaker Script","FlagShip","Flavors","FLOW-MATIC","FOCAL (HP-41)","Forth","Fortran","Fortress","FRACTRAN","FreeBASIC","FreeMat","FUP","G","Gambas","Game Maker Language (GML)","Gauss","GDScript","Generative Modelling Language (GML)","GFA-BASIC","Go","Gofer","GPSS (General Purpose Simulation System)","GrGen.NET","Grape","Groovy","Hack","HAL","Haskell","Haxe","High Level Shading Language (HLSL)","Hollywood","HQ9+","HTML","iCon-L","Industrial Robot Language (IRL)","Inform","Interactive Data Language (IDL)","INTERCAL","Io","ISWIM","J","J#","Jasmin","Java","JavaScript (JScript, ECMAScript, DHTML)","Job Control Language (JCL)","JOVIAL","Joy","JScript","JScript .NET","Julia","Jython (JPython)","KiXtart","Kontaktplan (KOP)","Kornshell","Kotlin","LabVIEW","Liberty Basic","Lingo","Limbo","Linda","Linden Scripting Language (LSL)","Linear Programming Language (LPL)","Lisp","Logo","LOLCODE","LotusScript","LPC","Lua","Luna","Lustre","Lite-C","M","M4","Malbolge","Maple","Mathematica","Matlab","Max/MSP","MDL","Mercury","Mesa","MetaQuotes Language (MQL4/MQL5)","Miranda","MIXAL","ML","Modula (Modula-2, Modula-2+, Modula-3)","Monkey X","MPD","MUMPS","Nasal","NATURAL","NetLogo","NeWS","Newsqueak","NewtonScript","NewLISP","Nice","Not Quite C (NQC)","Not eXactly C (NXC)","Nyquist","Oberon","Objective-C","Objective-C++","OCaml","Object Pascal","Occam","Octave","Ook!","Opal","OPL","OpenGL ES Shading Language","OpenGL Shading Language","Oz","Pacbase","Pascal","Pascal Script","PEARL","Perl","Phalanger","Pharo","PHP","Piet","Pike","PILOT","PL/0","PL/I","PL/M","PL/S","PL/SQL","Plankalkül","Posity","PostScript","POW!","PowerScript","PowerShell","Processing","PROGRES","Prolog (Arity Prolog, Turbo Prolog, Sicstus, CLP, CLPR)","PROSA","PS 440","PureBasic","Pure Data","Python","Q#","QuakeC","QML","R","Raku","REBOL","REXX","Robot Karol","RPG","Ruby","Rust","S","S-Lang","SabreTalk","SAIL (Stanford AI Language)","SassScript","Sather","Scala","Scilab","Scheme","Strukturierter Text (SCL)","Scratch","Script.NET","Server Side Includes (SSI)","Seed7","Self","SETL","Shakespeare","Shell (sh, ksh, bash, csh, zsh)","Simula","Simulink","Sing#","Slate","Sleep","Smalltalk","Snap!","SNOBOL4","Solidity","Spec#","Specification and Description Language (SDL)","SQL","Squeak","Squirrel","SR","Standard ML (SML)","StatPascal","StepTalk","STOIC","STOS BASIC","Strongtalk","StarOffice Basic (OOoBasic)","Swift","SuperCollider","System Management Language (SML)","TACL","TAL (Transaction Application Language)","Tcl","TECO","TELON (auch CA-Telon)","TI-Basic","Timing Definition Language (TDL)","Transact-SQL","TTCN","TTCN-3","Turing","TypeScript","UnrealScript","Vala","VEE","Visual Basic Classic (VB)","Visual Basic .NET (VB.NET)","Visual Basic for Applications (VBA)","Visual Basic Script (VBScript)","Visual FoxPro","Visual J++","Visual Objects (VO)","Vienna Definition Language (VDL)","VisSim","Vulcan.NET","vvvv","Web","Web Language","Whitespace","WinDev","WordBasic","WMLScript","Wyvern","X10","Xbase++","XL","XL (XML-Programming-language)","Xojo","XProfan","XSL Transformation (XSLT)","Xtend","Zonnon"]
/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
autocomplete(document.getElementById("myInput"), programmingLanguage);