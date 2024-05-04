
import kafkajs,{Partitioners} from 'kafkajs'


// const kafkaClient= new kafkajs.Kafka({
//     clientId:'review-service',
//     brokers:['127.0.0.1:9092']
//   })
// const producer=kafkaClient.producer({
//     createPartitioner: Partitioners.LegacyPartitioner
//   })
//   const sendMessage= async (topic:string,message:{})=>{
//     await producer.connect()
//     await producer.send({
//         topic,
//         messages:[{value:JSON.stringify(message)}]
//     })
  
//   }



// export {sendMessage}