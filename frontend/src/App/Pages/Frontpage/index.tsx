import '../pages.css'
import logo from '../../../assets/logo-hy-mooc.png'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { debounce } from 'lodash';
// import { getBookOneByUserId, updateBookOne, BookOne } from '../../api/bookOneService';
//
// type MutationContext = {
//   previousData?: BookOne;
// };
//function FrontPage() {

  // const queryClient = useQueryClient();
  // const userId = sessionStorage.getItem('id');

 // // Use `useQuery` to fetch the bookOne data
 //  const { data: bookOne } = useQuery<BookOne, Error>({
 //    queryKey: ['bookone', userId], // Unique query key
 //    queryFn: () => getBookOneByUserId(userId!), // Query function
 //    enabled: !!userId, // Only run if userId exists
 //  }, queryClient);
 //
 //

  // // Mutation for updating BookOne
  // const mutation = useMutation<BookOne, Error, Partial<BookOne>, MutationContext>({
  //   mutationFn: async (updatedBook: Partial<BookOne>) => {
  //     if (!bookOne) {
  //       throw new Error('bookOne is not defined');
  //     }
  //     return await updateBookOne(bookOne.id, updatedBook);
  //   },
  //   onMutate: async (newData) => {
  //     await queryClient.cancelQueries({
  //       queryKey: ['bookone', userId],
  //     }); // Cancel queries to ensure fresh data
  //     const previousData = queryClient.getQueryData<BookOne>(['bookone', userId]);
  //     queryClient.setQueryData<BookOne>(['bookone', userId], (old) => {
  //       if (!old) {
  //         throw new Error('bookOne is not defined');
  //       }
  //       return { ...old, ...newData };
  //     });
  //     return { previousData };
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['bookone', userId] }); // Invalidate queries after a successful update
  //     console.log('BookOne updated successfully');
  //   },
  //   onError: (error, _newData, context) => {
  //     console.error('Error updating BookOne:', error);
  //     if (context?.previousData) {
  //       queryClient.setQueryData<BookOne>(['bookone', userId], context.previousData);
  //     }
  //   },
  //   onSettled: () => queryClient.refetchQueries({ queryKey: ['bookone', userId] }), // Refetch queries after mutation
  // });

  // // Debounced mutation to avoid multiple rapid updates
  // const debouncedUpdateBookOne = useRef(
  //   debounce((updatedBook: Partial<BookOne>) => mutation.mutate(updatedBook), 500)
  // ).current;
  //
  // const [answer, setAnswer] = useState<string>('');
  //
  // const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setAnswer(event.target.value);
  //   if (bookOne) {
  //     bookOne.displayName = event.target.value;
  //     debouncedUpdateBookOne({ displayName: event.target.value }); }
  // };

  // useEffect(() => {
  //   if (bookOne) {
  //     setAnswer(bookOne.displayName || '');
  //   }
  // }, [bookOne]);

function FrontPage() {
  return (
    <div className="front-background">
      <div className="front-container">
        <h1 className="front-title">Business Model Canvas</h1>
          <img src={logo} alt="HY MOOC logo" className="front-logo" />
      </div>
    </div>
  );
}

export default FrontPage;

