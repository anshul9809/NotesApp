let faq = document.querySelectorAll(".faq-heading");
if(faq){
  for (let i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      console.log("panel is ",panel);
      console.log("panel scroll height is ", panel.scrollHeight);
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }
}