import React from "react";
import { useTable, useExpanded } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';

function Table({ columns: userColumns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state: { expanded },
    } = useTable(
        {
            columns: userColumns,
            data,
            defaultExpanded:true,
            // initialState: { expanded: {"0": true , "0.0" : true, "0.0.0" : true, "0.0.0.0": true} },
        },
        useExpanded // Use the useExpanded plugin hook
    )

    // Render the UI for your table
    return (
        <div>
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
           
            <br />
        </div>
    )
}

function ExpandableTableComponent() {
    const columns = React.useMemo(
        () => [
            {
                id: 'expander', // Make sure it has an ID
                Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
                    <span {...getToggleAllRowsExpandedProps()}>
                        {isAllRowsExpanded ? '👇' : '👉'}
                    </span>
                ),
                Cell: ({ row }) =>
                    row.canExpand ? (
                        <span
                            {...row.getToggleRowExpandedProps({
                                style: {
                                    paddingLeft: `${row.depth * 2}rem`,
                                },
                            })}
                        >
                            {row.isExpanded ? '👇' : '👉'}
                        </span>
                    ) : null,
            },
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'ID',
                        accessor: 'id',
                    },
                    {
                        Header: 'Type',
                        accessor: 'type',
                    },
                    {
                        Header: 'Fab',
                        accessor: "fab",
                    },
                    {
                        Header: 'Product',
                        accessor: 'product',
                    },
                    {
                        Header: 'Description',
                        accessor: 'description',
                        Cell: ({ cell }) => {
                            return cell?.value?.length > 100? <div style={{whiteSpace:'pre-wrap', overflowWrap:'break-word'}}>
                                <p>
                                {cell.value.slice(0, 100) + '...'}
                                </p>
                            </div> : cell.value;
                        },
                        width: 100,

                    }
                ],
            },
        ],
        []
    )

    const data = [
  {
    id: 'txn.crd_entprty',
    type: 'Data Element',
    product: 'ICNT-ATLAS-SIMCORP-API',
    fab: 'fnd-crtfct-trns-API',
    description: null,
    subRows: [
      {
        id: 'Transformation',
        type: 'Transforn',
        product: 'ICAT-ATLAS-SIMCORP-API',
        fab: 'fnd-crtfct-trns-API',
        description: 'dgfhdgdjhfgdgfjdgfjhdgsfhjgdsjhfgdjhgfhdgfjhdgfjhgdjfgdjhgfjdgfjdgfjgdjfgdjfgjdgfjdgfjdggfjhdfjhdgfjhdgfjhgdhfgdhjfgjhdgfhjdgfhjdgfjhdgfhjdgfjhdgfhjgdhfjgdhfgdhjgfhdgfeyejjjjfjffjhgdjfhgdjhfgdjhgfjhdgfjhdgfjhdgfjhgdjhfgdjhfgdhgfjhdgfjdgfjhdgfjhdgfjgdjhfgdjhfgjdh',
        subRows: [
          {
            id: 'ed_cntrprty',
            type: 'Data Element',
            product: 'ICHT-AladdinAtlas Interface',
            fab: 'Atlas_Pos_Trans',
            description: null,
            subRows: [
              {
                id: 'Transformation',
                type: 'Transforn',
                product: 'ICT-AladdinAtlas Interface',
                fab: 'Atlas_Pos_Trans',
                description:
                  'If transaction. tran_type is CALL, PUT, EXIN, or EXOUT.',
                  subRows: [
                  {
                    id: 'TRAN_TYPE',
                    type: 'Data Element',
                    product: 'ICM-Blackrock-Aladdin',
                    fab: 'MainTransaction',
                    description: null,
                    children: null,
                  },
                  {
                    id: 'TRAN_TYPE',
                    type: 'Data Element',
                    product: 'ICM-Blackrock-Aladdin',
                    fab: 'MainTransaction',
                    description: null,
                    subRows: null,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]
console.log(JSON.stringify(data));
return (
    <Table columns={columns} data={data} />
)
}

export default ExpandableTableComponent;
