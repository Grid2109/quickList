const form = document.querySelector("form");
const addItemInput = document.querySelector(".add-item-input");
const shoppingItem = document.querySelector(".shopping-item");

const shoppingList = document.querySelector("ul");

addItemInput.oninput = () => {
  // Remove números do valor do input
  addItemInput.value = addItemInput.value.replace(/[0-9]/g, "");

  // console.log(addItemInput.value);
};

//Captura o evento de submit do formulário para obter os valores
form.onsubmit = (event) => {
  //Previne o comportamento padrão do formulário de recarregar a página
  event.preventDefault();

  // Verifica se o input tem pelo menos 3 caracteres
  if (addItemInput.value.trim().length >= 3) {
    // Chama a função que adiciona novo item na lista
    itemAdd();

    // Limpa o campo após adicionar
    addItemInput.value = "";
  } else {
    // Alerta o usuário se o texto for muito curto
    alert("Por favor, digite pelo menos 3 caracteres para adicionar um item.");
  }
};

const itemAdd = () => {
  try {
    //Cria o elemento para adicionar o item(li) na lista(ul)
    const shoppingItem = document.createElement("li");
    shoppingItem.classList.add("shopping-item");

    //Cria o input de checkbox
    const checkboxInput = document.createElement("input");
    checkboxInput.classList.add("item-checkbox");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.setAttribute(
      "id",
      "item" + (shoppingList.children.length + 1)
    );
    console.log(checkboxInput);

    // Cria o nome do item da compra
    const itemName = document.createElement("label");
    itemName.classList.add("item-name");
    itemName.htmlFor = checkboxInput.id; // Conecta label ao checkbox
    itemName.textContent = addItemInput.value; // Usa o valor do input

    //Cria o ícone de remover
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "assets/icons/trash.svg");
    removeIcon.setAttribute("alt", "ícone de lixeira");
    
    //adiciona na li o checkbox, o label e o icone
    shoppingItem.append(checkboxInput, itemName, removeIcon);


    //Adiciona o item(li) na lista(ul)
    shoppingList.append(shoppingItem);
  } catch (error) {
    alert("Não foi possível atualizar a lista de compras.");
    console.log(error);
  }
};

updateList = () => {
  const items = shoppingList.children;

  // Itera por todos os itens da lista
  for (let i = 0; i < items.length; i++) {
    // Cria o novo ID sequencial baseado no índice atual + 1 (para começar em 1 em vez de 0)
    const newId = "item" + (i + 1);
    // Encontra o elemento checkbox dentro do item atual
    const checkbox = items[i].querySelector("input");
    // Encontra o elemento label dentro do item atual
    const label = items[i].querySelector("label");

    // Se o checkbox foi encontrado, atualiza seu ID
    if (checkbox) checkbox.id = newId;
    // Se o label foi encontrado, atualiza o atributo "for" para manter a associação com o checkbox
    if (label) label.setAttribute("for", newId);
  }

  console.log(items.length);

  // console.log("Lista atualizada: " + items.length + (items.length > 1 ? " itens" : " item"));
};

shoppingList.onclick = (e) => {
  //Verifica se o elemento clicado é o ícone de remover
  if (e.target.classList.contains("remove-icon")) {
    //Obtém o li pai do elemento clicado
    const item = e.target.closest(".shopping-item");

    //Obtém o checkbox do item
    const itemCheckbox = item.querySelector("input[type='checkbox']");

    //Verifica se o checkbox está marcado
    if (itemCheckbox.checked) {
      // Obtém o ID do item
      const itemId = item.querySelector("input").id;

      // Obtém o nome do item
      const itemName = item.querySelector("label").textContent;

      console.log(`Item excluído: ID = ${itemId}, Nome = ${itemName}`);

      //Remove o item da lista
      item.remove();

      // Cria a div da notificação
      const notification = document.createElement("div");
      notification.classList.add("notification");

      //cria o elemento de span 
      const notificationIcon = document.createElement("span");
      notificationIcon.classList.add("notification-icon");

      // Cria o elemento de imagem com o ícone alert
      const alertIcon = document.createElement("img");
      alertIcon.setAttribute("src", "assets/icons/alert.svg");
      alertIcon.setAttribute("alt", "icone de exclamação");

      // Cria um nó de texto puro (sem elemento envolvendo)
      const textNode = document.createTextNode(" Item foi removido da lista ");

      // Cria o botão de fechar
      const closeNotification = document.createElement("div");
      closeNotification.classList.add("close-notification");
      
      // Cria o elemento de imagem com o ícone de x
      const closeIcon = document.createElement("img");
      closeIcon.classList.add("remove-item");
      closeIcon.setAttribute("src", "assets/icons/delete.svg");
      closeIcon.setAttribute("alt", "icone de x");

      // Adiciona o evento de clique ao botão de fechar
      closeIcon.onclick = () => {
        notification.remove();
      };
      
      //adiciona dentro do span a imagem de alerta
      notificationIcon.append(alertIcon);
      
      //adiciona dentro da div de fechar a imagem de x
      closeNotification.append(closeIcon);

      // Adiciona os elementos que estão dentro da  div notificação
      notification.append(notificationIcon, textNode, closeNotification);

      // Adiciona a notificação na página
      document.querySelector("main").append(notification);

      // Configura o timer para remover a notificação automaticamente
      setTimeout(() => {
        notification.remove();
      }, 3000);
    } else {
      // Opcional: alerta o usuário que precisa marcar o checkbox primeiro
      alert("Marque o checkbox para poder excluir este item.");
    }
  }

  updateList();
};
