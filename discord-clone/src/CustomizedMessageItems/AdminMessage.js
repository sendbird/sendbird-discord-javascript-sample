import React from "react";

import { Card, CardContent, Typography } from "@material-ui/core";

export default function AdminMessage(props) {
  const { message } = props;
  return (
    <div className="admin-message">
      <Card>
        <CardContent>
          <Typography color="textSecondary">Admin message</Typography>
          <Typography variant="body2" component="p">
            {message.message}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
