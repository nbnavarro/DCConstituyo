import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader';

function Organizer() {
    const [ordertype, setOrdertype] = useState("Fecha de registro");

    function organizeByAge(){
        setOrdertype("Edad")
        var constituents = document.getElementsByClassName('constituent');

        var constArray = Array.prototype.slice.call( constituents )
        console.log(constArray)
        var constArrayOrg = constArray.sort(order)
        console.log(constArrayOrg)
        var parent = constituents[0].parentNode
        for (var i = 0; i < (constituents.length); i++) {
            parent.removeChild(constituents[i])
            console.log("removing...")
        }
        for (var j = 0; j < (constArrayOrg.length); j++) {
            parent.appendChild(constArrayOrg[j])
            console.log("appending...")
        }
        function order(const1, const2) {
            var ordered = document.getElementById("order");
            if (ordered.value === "crec"){
                return parseInt(const1.id.split("_")[1]) - parseInt(const2.id.split("_")[1])
            } else{
                return parseInt(const2.id.split("_")[1]) - parseInt(const1.id.split("_")[1])
            }
            
        }
    }
    function organizeByDate() {
        setOrdertype("Fecha de registro")
        var constituents = document.getElementsByClassName('constituent');
    
        var constArray = Array.prototype.slice.call( constituents )
        console.log(constArray)
        var constArrayOrg = constArray.sort(order)
        console.log(constArrayOrg)
        var parent = constituents[0].parentNode
        for (var i = 0; i < (constituents.length); i++) {
            parent.removeChild(constituents[i])
            console.log("removing...")
        }
        for (var j = 0; j < (constArrayOrg.length); j++) {
            parent.appendChild(constArrayOrg[j])
            console.log("appending...")
        }
        function order(const1, const2) {
            var ordered = document.getElementById("order");
            var date1 = new Date(const1.id.split("_")[2])
            var date2 = new Date(const2.id.split("_")[2])
            if (ordered.value === "crec"){
                return parseInt(date1.getTime()) - parseInt(date2.getTime())
            } else {
                return parseInt(date2.getTime()) - parseInt(date1.getTime())
            }
        }
    }
    
    function organizeByName() {
        setOrdertype("Nombre")
        var constituents = document.getElementsByClassName('constituent');
    
        var constArray = Array.prototype.slice.call( constituents )
        console.log(constArray)
        var constArrayOrg = constArray.sort(order)
        console.log(constArrayOrg)
        var parent = constituents[0].parentNode
        for (var i = 0; i < (constituents.length); i++) {
            parent.removeChild(constituents[i])
            console.log("removing...")
        }
        for (var j = 0; j < (constArrayOrg.length); j++) {
            parent.appendChild(constArrayOrg[j])
            console.log("appending...")
        }
        function order(const1, const2) {
            var ordered = document.getElementById("order");
            if (ordered.value === "crec"){
                if (const1.innerText >= const2.innerText) {
                    return 1
                }else {
                    return -1
                }
            } else{
                if (const1.innerText <= const2.innerText) {
                    return 1
                }else {
                    return -1
                }
            }
        }
    }

    function changeOrder() {
        var constituents = document.getElementsByClassName('constituent');
        var constArray = Array.prototype.slice.call( constituents )
        var constArrayOrg = constArray.reverse()
        var parent = constituents[0].parentNode
        for (var i = 0; i < (constituents.length); i++) {
            parent.removeChild(constituents[i])
            console.log("removing...")
        }
        for (var j = 0; j < (constArrayOrg.length); j++) {
            parent.appendChild(constArrayOrg[j])
            console.log("appending...")
        }

    }

  return (
  	<div>
        <button className="button" onClick={organizeByAge}>Edad</button>
        <button className="button" onClick={organizeByDate}>Fecha de registro</button>
		<button className="button" onClick={organizeByName}>Nombre</button>
		<label>Orden</label>
        <select name="order" id="order" defaultValue="crec" onChange={changeOrder}>
            <option value="crec">Creciente</option>
            <option value="decrec">Decreciente</option>
        </select>
        <p className="link">Ordenado por: {ordertype}</p>
    </div>
  );
}

export default hot(module)(Organizer);