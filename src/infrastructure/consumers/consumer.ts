import kafkajs from 'kafkajs';
import { consumeStudentEvents,consumeCoordinatorEvents } from '../..';
const kafkaClient = new kafkajs.Kafka({
  clientId: 'review-service',
  brokers: ['127.0.0.1:9092'] // Adjust if Kafka runs on a different port or host
});

const consumer = kafkaClient.consumer({ groupId: 'review-service-group' });
const consumerConnect =async ()=>{
    await consumer.connect()
    await consumer.subscribe({topic:'student-data',fromBeginning:true})
    await consumer.subscribe({topic:'coordinator-data',fromBeginning:true})
    await consumer.run({
        eachMessage:async ({topic,partition,message})=>{
            try{
                switch(topic){
                    case 'student-data':
                    await consumeStudentEvents(message)
                    break;
                    case  'coordinator-data':
                    await consumeCoordinatorEvents(message)
                    break;

                    default:

                    console.log(`Unhandled topic: ${topic}`)
                }


            }
            catch(error){

            }

        }

    })
}



export {consumerConnect}

