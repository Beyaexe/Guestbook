import { questionsList } from "../../models/questions"
import type { Question } from "../../models/questions"

interface GrimoireProps {
    onToggleModal: () => void
    onSelectQuestion: (question: Question) => void
}


export function Grimoire({ onToggleModal, onSelectQuestion }: GrimoireProps) {
//     return (

        
//     <dialog 
//     open className="modal-overlay">

//       <header>
//         <h2>O Grimório está aberto. <br/> Seja breve! Ele não costuma ter muita paciência.</h2>
//       </header>

//       <div>
//         <ul style={{ listStyle: "none", padding: 0 }}>

//           {questionsList.map((question) => (
//             <li key={question.id} style={{ marginBottom: "8px" }}>
//               <button 
//                 type="button"
//                 onClick={() => onSelectQuestion(question)}
//               >
//                 <strong>✨ #{question.id}: </strong>
//                 {question.text}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <footer>
//         <button type="button" onClick={onToggleModal}>
//           Fechar ❌
//         </button>
//       </footer>

//     </dialog>
//   )

return (
    //Para fechar o modal se clicar fora
    <div 
      onClick={onToggleModal}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <dialog 
        open
        onClick={(e) => e.stopPropagation()} 
        style={{
          backgroundColor: "#1a1a1a", 
          color: "#fff",
          padding: "24px",
          borderRadius: "12px",
          maxWidth: "500px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
          border: "none"
        }}
      >
        <header style={{ marginBottom: "16px" }}>
          <h2>O Grimório está aberto. 📜</h2>
          <small>Seja breve! Ele não costuma ter muita paciência.</small>
        </header>

        <div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {questionsList.map((question) => (
              <li key={question.id} style={{ marginBottom: "10px" }}>
                <button 
                  type="button"
                  onClick={() => onSelectQuestion(question)}
                  style={{ width: "100%", textAlign: "left", cursor: "pointer" }}
                >
                  <strong>✨ #{question.id}: </strong>
                  {question.text}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <footer style={{ marginTop: "16px", textAlign: "right" }}>
          <button type="button" onClick={onToggleModal}>
            Fechar ❌
          </button>
        </footer>
      </dialog>
    </div>
  );
}