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


const deleteNote = document.querySelector("#delete_note");
if(deleteNote){
  const modal = document.getElementById("delete-modal");
  const closeButton = document.getElementsByClassName("close-button")[0];
  const cancelButton = document.getElementsByClassName("cancel")[0];
  cancelButton.addEventListener("click", (event)=>{
    event.preventDefault();
    modal.classList.remove("active");
  });

  deleteNote.onclick = (event) => {
    event.preventDefault();
    modal.classList.add("active");
  };
  closeButton.onclick = () => {
    modal.classList.remove("active");
  };
  window.onclick = (event) => {
    if (event.target == modal ) {
      modal.classList.remove("active");
    }
  };
}