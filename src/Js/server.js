//INICIALIZAMOS SERVIDOR
const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Running');
});

//EVENTO CONNECTION PARA CONEXION CLIENTE SERVER
io.on("connection", (socket) => {
	console.log("Evento 'connection2' recibido de " + socket.id);
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
		console.log("Evento 'calluser' recibido." + from + " " + name + userToCall);
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
		console.log("Evento 'answercall' recibido.");
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
