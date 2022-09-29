import fetch from 'node-fetch';
                                     //157959751
let decimalpi = ""; //314159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912983367336244065664308602139494639522473719070217986094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872146844090122495343014654958537105079227968925892354201995611212902196086403441815981362977477130996051870721134999999837297804995105973173281609631859502445945534690830264252230825334468503526193118817101000313783875288658753320838142061717766914730359825349042875546873115956286388235378759375195778185778053217122680661300192787661119590921642019812141234123412341579597511234123412341234";     
let apart = "";
let index = 0;
let countres = 2;
let ppn = [];
let pldrnc = "";
let cifras = 7;
let start = 50;
let finished = 100;
let mil = 100;
let url = "";

const countURL = () => {
    for (start;start<=finished*mil+1;start=start+mil){   
        url=`https://api.pi.delivery/v1/pi?start=${start}&numberOfDigits=100`; 
        callPi(url,start);
    }
}

const callPi = (url,fragment) => {

    fetch(url)
        .then((res) => {return res.ok? res.json() : Promise.reject(res)})
        .then((json) => { ppn=countPPN(json.content);
                        return ppn})
        .then((ppn)=>{ if(ppn!==undefined) {console.log(`fragment: ${fragment+index} checked`)} 
                        else return})

        .catch((err) => {console.log(err.message)})
        .finally(()=>{return})  

}

const countPPN = (decimalpi) => {


    for (let x=0; x<decimalpi.length;x++) {
        
        if(decimalpi[x-countres]===decimalpi[x]){

            index=x-(countres/2-1); 
            pldrnc=decimalpi.slice(x-countres,x+1);  
            countres = countres+2; 
            if(pldrnc.length===cifras){ 
                
                if(isPrime(pldrnc)){
                    console.log("tu numero palindromico primo de "+ cifras + " es "+ pldrnc),
                    countres==2? (
                            console.log("letra:"+decimalpi[x])
                        ) : 
                    console.log("letra:"+decimalpi[x-(countres/2-1)])
                    return pldrnc;
                } 
            }    
        }
        else {
            countres = 2;
        }
    }   
}

const isPrime = (number) => {

    let result=true;
    for(let x=2;x<=9;x++){
        if(number%x===0){
            result=false;
            break;
        }
    }
    return result;
}

countURL();


