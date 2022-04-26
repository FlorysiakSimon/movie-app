import React from 'react'
import './Carrousel.scss'
import { loadImages } from '../../services/loadImages';

export default function Carrousel() {

    function Gallery(domNode){
        let i = 3;
        setInterval(()=>{
         requestAnimationFrame(()=>{
            if(i === 3){
                domNode[3].style.opacity = 0;
                i--;
            }else if(i === 2){
            domNode[2].style.opacity = 0;
            i--;
            }else if(i === 1){
            domNode[1].style.opacity = 0;
            i--;
            }else if(i === 0){
            domNode[0].style.opacity = 0;
            domNode[2].style.opacity = 1;
            domNode[1].style.opacity = 1;
            domNode[0].style.opacity = 1;
            i = 2;
            }
            });
        },10000);
    }

    // We check if all the carroussel images is loaded

    loadImages(...['../../assets/bg1.jpg','../../assets/bg2.jpg','../../assets/bg3.jpg','../../assets/bg4.jpg'])
    .then((response)=>{

       if(response === "All Images are loaded"){

        const carrousselElements = document.querySelectorAll(".carroussel-elements");

               carrousselElements.forEach((element)=>{

                 element.classList.remove("hide");

               });

        Gallery(carrousselElements);

       }
    });

    return (
        <div id='carroussel'>
            <div id="carroussel-mask"></div>
            <div className='carroussel-elements bg1 hide'></div>
            <div className='carroussel-elements bg2 hide'></div>
            <div className='carroussel-elements bg3 hide'></div>
            <div className='carroussel-elements bg4 hide'></div>
            <div id='filter'></div>
        </div>
    )
}
