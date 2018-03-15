export const connectedClients = new Set();
export function updateAll() {
    connectedClients.forEach(function each(client) {
        client.update();
    });
}
//# sourceMappingURL=ConnectedClients.js.map