import React, { useState } from 'react';

// Fusion
import { Grid, Flex, Box, DataTable, DataTableRow, DataTableColumn, Spinner } from 'fusion';

// Services
import { fetchAlbum } from './DataList.service';

const columns: DataTableColumn[] = [
	{
		field: 'id',
		value: 'Id'
	},
	{
		field: 'thumbnailUrl',
		value: 'Thumbnail'
	},
    {
        field: 'title',
        value: 'Title'
    },
];

const DataList = () => {
	const rows: DataTableRow[] = fetchAlbum().map((row:any) => ({
		...row,
		key: `album-${row.albumId}-post-${row.id}`,
		thumbnailUrl: (
			<Flex sx={{ justifyContent: 'flex-start', alignItems: 'center', ml: 3 }}>
				<img src={row.thumbnailUrl} alt={row.title} />
			</Flex>
		),
	}));

	return (
		<>
			{
				!rows || rows.length === 0 && (
                    <Spinner sx={{ height: 500 }} />
				)	
			}
			{
				rows.length > 0 && (

					<DataTable columns={columns} rows={rows} />
				)
			}
		</>
	);
}

export default DataList