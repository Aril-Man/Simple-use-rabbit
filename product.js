const amqp = require('amqplib')     // Import library amqp

amqp.connect('amqp://localhost')
    .then(conn => {
        return conn.createChannel().then(ch => {
            const msg = "HALO NAMA Ku ARIL"    // Isi pesan yang dikirim ke RabbitMQ
            const array = {
                name: "Azriel", 
                job: "Programmer",
                title: "backend" 
            }

            // Memanggil 'queue1'
            ch.assertQueue('Test', { durable: false })    
            
            // Mengirim pesan ke 'queue1'
            ch.sendToQueue('Test', Buffer.from(msg))     
            console.log('- Sent', msg)

        }).finally(() => {
            //Tutup koneksi ke RabbitMQ setelah selesai menggunakan.
            setTimeout(function() { conn.close(); }, 500);
        })
}).catch(console.warn)