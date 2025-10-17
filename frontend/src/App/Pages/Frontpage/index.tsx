
import { CSSProperties } from 'react';
import bg from '../../../assets/background.png'
import logo from '../../../assets/logo-hy-mooc.png'
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { debounce } from 'lodash';
// import { getBookOneByUserId, updateBookOne, BookOne } from '../../api/bookOneService';
//
// type MutationContext = {
//   previousData?: BookOne;
// };
function FrontPage() {

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

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '86.2%',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(to top, rgba(107, 143, 175, 0.75) 30%, rgba(0, 0, 0, 0)) 100%',
    paddingTop: '120px',

  };

  // const inputStyle: CSSProperties = {
  //   margin: '10px 0',
  //   padding: '10px',
  //   fontSize: '32px',
  //   border: 'none',
  //   outline: 'none',
  //   backgroundColor: 'rgba(70, 70, 70, 0)',
  //   color: 'white',
  //   width: '300px',  // Setting a width to ensure it is visible
  //   textAlign: 'center'
  // };

  const h1style: CSSProperties = {
      fontSize: '100px'
  }

 //  const logoStyle: CSSProperties = {
	// width: '200px',
	// height: 'auto',
 //        position: 'fixed',
 //        left: '10%',
 //        bottom: '10%',
 //  };

  const iconsStyle: CSSProperties = {
    width: '500px',
    height: 'auto',
  }

  // const infoIconWrapper: CSSProperties = {
  //   position: 'fixed',
  //   right: '10%',
  //   top: '10%',
  // }

//   const infotext = `This is your Book of Serendip. It is your main task in this programme. Fill it in and you will complete the first stage of your training. The main goal of this exercise is to create a desirable future vision based on a specific Boreal forest challenge.
//
// The Book includes seven sections, which for the best learning experience, you need to fill them in order:
//
// 1. Choose and define a challenge
//
// 2. Map of connections 
//
// 3. Identify leverage points
//
// 4. Redefine the chosen challenge
//
// 5. Values
//
// 6. Future vision and steps to achieve it
//
// 7.  My future vision pitch
//
// Enjoy writing the Book!`


  return (
		<>
       <style>
        {`
          body {
  background: url(${bg});
  background-size: cover;
  background-position: center;
}
          input::placeholder {
            color: rgba(255, 255, 255, 0.7);
            opacity: 1; /* Full opacity for placeholder */
          }
        `}
      </style>
    <div style={containerStyle}>

        
      <h1 style={h1style}>Business Model Canvas</h1>

      <img src={logo} alt='HY MOOC logo' style={iconsStyle} />

    </div>
    </>
  );
}

export default FrontPage;


