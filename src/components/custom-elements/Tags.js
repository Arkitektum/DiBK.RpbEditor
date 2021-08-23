import TagsInput from './TagsInput/TagsInput';

const Tags = ({ name, value, onChange }) => {
   const handleOnChange = tags => {
      onChange({ target: { name, value: tags } });
   };

   return (
      <TagsInput
         tags={value}
         onChange={handleOnChange}
         placeholder=""
      />
   );
}

export default Tags;
