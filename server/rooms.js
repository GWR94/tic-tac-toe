const getOpenRooms = (rooms) =>
  [...rooms.values()]
    .filter((room) => !room.players[2])
    .map((room) => ({
      roomCode: room.code,
      hostName: room.players[1].name,
    }))
    .sort((a, b) => a.roomCode.localeCompare(b.roomCode));

module.exports = { getOpenRooms };
