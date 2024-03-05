export default function UserPlus({ onClick }) {
  return (
    <svg
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      xmlns='http://www.w3.org/2000/svg'
      class='icon icon-tabler icon-tabler-user-plus'
      width='28'
      height='28'
      viewBox='0 0 24 24'
      stroke-width='1.5'
      stroke='#00b341'
      fill='none'
      stroke-linecap='round'
      stroke-linejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
      <path d='M16 19h6' />
      <path d='M19 16v6' />
      <path d='M6 21v-2a4 4 0 0 1 4 -4h4' />
    </svg>
  );
}
