import React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'

export default function InfoBox({title, cases, total}) {
    return (
        <Card>
            <CardContent>
                {/* title */}
                <Typography className="infoBox-Title" color="textSecondary">{title}</Typography>
                {/* number of cases */}
                <h2 className="infoBox-cases">{cases}</h2>
                {/* total */}
                <Typography className="infoBox-Total" color="textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
    )
}
