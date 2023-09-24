import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { useState } from 'react';
import { useGetCommentQuery, usePostCommetMutation } from '@/redux/features/product/productApi';

const dummyComments = [
  'Bhalo na',
  'Ki shob ghori egula??',
  'Eta kono product holo ??',
  '200 taka dibo, hobe ??',
];

export default function ProductReview({id}:{id:string}) {
  const [inputValue,setInputValue]=useState("")
  const [postComment,options]=usePostCommetMutation()
  const handleComment=()=>{
    postComment({
      id:id,
      data:inputValue
    })
  }
  const {data}=useGetCommentQuery(id,{refetchOnMountOrArgChange:true,pollingInterval:300000})
 console.log(data)
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5 items-center">
        <Textarea className="min-h-[30px]" onChange={(e)=>setInputValue(e.target.value)}/>
        <Button className="rounded-full h-10 w-10 p-2 text-[25px]" onClick={handleComment}>
          <FiSend />
        </Button>
      </div>
      <div className="mt-10">
        {data?.result?.comments.map((comment:string, index:number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
