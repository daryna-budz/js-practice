/*
Реалізуйте систему бронювання номерів у готелі. Вона повинна дозволяти створювати номери, бронювати номери і виводити інформацію про заброньовані номери. Використовуйте правильне прив'язування контексту this в методах класу.

Підказка:

Використовуй bind, call, або apply для прив'язування контексту.
*/




function startButton(){
    class HotelRoom {
        constructor(number){
            this.number = number;
            this.isBooked = false
        }
        book(){
            if(!this.isBooked){
                this.isBooked = true;
                return "Congratulations! Your room is booked";
            }else{
                return `Sorry,room ${this.number} is booked already`;
            }
        }
    }
    
    class Hotel {
        constructor(){
            this.rooms = [];
        }
    
        addRoom(...numbers){
            numbers.forEach(number => {
                const room = new HotelRoom(number);
                this.rooms.push(room);
            })
        }
    
        bookRoom(number){
            let room = this.rooms.find(room => room.number === number);
            if(room){
                return room.book.call(room);
            }else{
                return "Sorry there is no such room in a hotel";
            }
        }
    
        printHotelRooms(){
            return this.rooms.map(room => `Room: #${room.number}, Status: ${room.isBooked ? "Booked" : "Available"}`).join('\n');
        }
    }
    
    
    
    const hotel = new Hotel();
    hotel.addRoom.apply(hotel,[100,101,102,103,104,105,106,107,108])
    let userRoom = +prompt("Enter the room you want to book:");
    const bookMsg = hotel.bookRoom(userRoom);
    alert(bookMsg);
    alert(hotel.printHotelRooms.bind(hotel)());
}

