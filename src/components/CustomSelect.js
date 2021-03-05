import { useState, useEffect } from 'react';
import '../styles/CustomSelect.scss';

const CustomSelect = ({ options, def, func }) => {
  const [ open, setOpen ] = useState(false);
  const [ selected, setSelected ] = useState(def);

  useEffect(() => {
    func(selected);
  }, [selected])

  const toggleSelect = () => {
    setOpen(old => !old);
  }

  const clickOption = (option) => {
    setSelected(old => option.target.innerText);
  }

  

  return (
    <div className={`custom-select ${open ? 'open' : ''}`} onClick={toggleSelect}>
      <div className={`selected ${open? 'open' : ''}`}>
        { selected ? selected : def }
      </div>
      <div className={`items ${!open ? 'selectHide' : ''}`}>
          { options.map((option, index) => (<div className='option' key={index} onClick={clickOption}>{ option }</div>)) }
      </div>
  </div>
  )
}

export default CustomSelect
