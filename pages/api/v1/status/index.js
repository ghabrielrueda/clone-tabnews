function status(request, response) {
  response.status(200).json({ chave: "O Ghabriel é acima da média" });
}

export default status;
