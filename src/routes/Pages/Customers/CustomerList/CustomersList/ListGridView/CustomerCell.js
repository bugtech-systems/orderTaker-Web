import React from 'react';
import Box from '@material-ui/core/Box';
import CmtAvatar from '../../../../../../@coremat/CmtAvatar';
import Typography from '@material-ui/core/Typography';
import useStyles from '../CustomerCell.style';
import PropTypes from 'prop-types';
import ContactCellOptions from '../ListTableView/CustomerCellOptions';

const ContactCell = ({ contact, onShowContactDetail, onClickEditContact }) => {
  const classes = useStyles();

  const { fullName, email_address, phones, company, balance, limit, dpUrl } = contact;
  return (
    <Box className={classes.gridContactCell} onClick={() => onShowContactDetail(contact)}>
      <Box className={classes.gridContactCellHeader} display="flex" mb={3}>
        <Box width={{ sm: 'calc(100% - 56px)' }} display="flex" alignItems="center">
          <Box mr={4}>
            <CmtAvatar size={40} src={dpUrl} alt={fullName} />
          </Box>

          <Box width="calc(100% - 56px)">
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {fullName}
            </Typography>
            <Typography className={classes.subTitleRoot}>Balance: ₱{balance}.00</Typography>
          </Box>
        </Box>
        <Box ml={{ sm: 'auto' }} onClick={e => e.stopPropagation()}>
          <ContactCellOptions contact={contact} onClickEditContact={onClickEditContact} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box mb={2} component="p" className={classes.textTruncate}>
          {email_address}
        </Box>
        <Box mb={2} component="p">
          {phones[0].phone}
        </Box>
        <Box component="p" className={classes.textTruncate}>
          Limit: ₱{limit}.00
        </Box>
      </Box>
    </Box>
  );
};

export default ContactCell;

ContactCell.prototype = {
  contact: PropTypes.object.isRequired,
  onShowContactDetail: PropTypes.func,
  onClickEditContact: PropTypes.func,
};
