import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import MenuItems_ from '../items/MenuItems';
export const MenuItems = MenuItems_;

export const MenuItem = (
    message,
    userId,
    onUpdateMessage,
    messageText,
    onDeleteMessage,
    pressedUpdate,
    setPressedUpdate
) => {

  return (
    // <li
    //   className={getClassName([className, 'sendbird-dropdown__menu-item', disable ? 'disable' : ''])}
    //   role="menuitem"
    //   onClick={handleClickEvent}
    //   onKeyPress={(e) => { if (e.keyCode === ENTER) handleClickEvent(e); }}
    //   tabIndex={0}
    // >
    //   <Label
    //     className="sendbird-dropdown__menu-item__text"
    //     type={LabelTypography.SUBTITLE_2}
    //     color={disable ? LabelColors.ONBACKGROUND_4 : LabelColors.ONBACKGROUND_1}
    //   >
    //     {children}
    //   </Label>
    // </li>
        <div className="message-options-wrap" >
            <ul className="sendbird_dropdown_menu"> 
                {message.sender && message.sender.userId === userId && (
                <div> 
                    {pressedUpdate && (
                        <li className="dropdown__menu-item" onClick={() => setPressedUpdate(false)}>
                        <span className="dropdown__menu-item-text">Cancel</span>
                        </li>
                    )}

                    {!pressedUpdate && (
                        <li className="dropdown__menu-item" onClick={() => {setPressedUpdate(true)}}>
                        <span className="dropdown__menu-item-text">Edit</span>
                        </li>
                    )}

                    {pressedUpdate && (
                        <li className="dropdown__menu-item" onClick={() => onUpdateMessage(message.messageId, messageText)}>
                        <span className="dropdown__menu-item-text">Save</span>
                        </li>
                    )}

                    {!pressedUpdate && (
                        <li className="dropdown__menu-item" onClick={() => onDeleteMessage(message)}>
                        <span className="dropdown__menu-item-text">Delete</span>
                        </li>
                    )}
                </div>
                )}
            </ul>
    </div>
  );
};

MenuItem.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
  disable: PropTypes.func,
};

MenuItem.defaultProps = {
  className: '',
  disable: false,
};

// Root components should be appended before ContextMenu is rendered
export const MenuRoot = () => (
  <div id="sendbird-dropdown-portal" />
);

export const EmojiReactionListRoot = () => (
  <div id="sendbird-emoji-list-portal" />
);

export default function ContextMenu({ menuTrigger, menuItems }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="sendbird-context-menu" style={{ display: 'inline' }}>
      {menuTrigger(() => setShowMenu(!showMenu))}
      {showMenu && menuItems(() => setShowMenu(false))}
    </div>
  );
}

ContextMenu.propTypes = {
  menuTrigger: PropTypes.func.isRequired,
  menuItems: PropTypes.func.isRequired,
};