export function animation(nodeToAnim, animationProperties){

    const {animationType, animationValue} = animationProperties;

     return new Promise((resolve, reject)=>{

            requestAnimationFrame(()=>{

                  nodeToAnim.style[animationType] = animationValue;

                  nodeToAnim.addEventListener("transitionend", ()=>{

                        return resolve("The animation is over");

                  });

            }, nodeToAnim);

     });

}