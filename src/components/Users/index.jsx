import React, { Component, Fragment } from "react";
import { getAllListUsers } from "../../Redux/_actions";
import { connect } from "react-redux";
import { Icon, Spin, PageHeader, Table, Input, Button, Divider } from "antd";
import Highlighter from "react-highlight-words";

const { Column } = Table;
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "30%"
  },
  {
    title: "Phone Number",
    dataIndex: "age",
    key: "age",
    width: "20%"
  },
  {
    title: "Gender",
    dataIndex: "age",
    key: "age",
    width: "20%"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  }
];
class Users extends Component {
  componentDidMount() {
    this.props.getAllListUsers();
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    const {
      UsersResponse: { data = [], loading }
    } = this.props;

    // data.forEach((element, key) => {
    //   dataToDisplay.push({
    //     imgPath: element.profileImage,
    //     title: element.name,
    //     gender: element,
    //     content: (
    //       <Fragment key={key}>
    //         <span>
    //           <span className="color-g">{element.gender}</span>{" "}
    //           <Icon type="user" theme="filled" /> {element.role}
    //         </span>
    //         <div>
    //           <p>
    //             <Icon type="mobile" theme="twoTone" /> {element.phoneNumber}{" "}
    //             <br />
    //             <Icon type="environment" /> {element.country} , {element.state}{" "}
    //             , {element.cityName} , {element.address}
    //           </p>
    //           <div>
    //             <Link to={"/admin/viewUser/1"}>
    //               <button className="cus-btn f-r mt--2">
    //                 <span className="circle">
    //                   <span className="icon arrow"></span>
    //                 </span>
    //                 <span className="button-text">View</span>
    //               </button>
    //             </Link>
    //           </div>
    //         </div>
    //       </Fragment>
    //     )
    //   });
    // });

    return (
      <Fragment>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          title="List of Users"
        />

        <Spin spinning={loading}>
          <Table columns={columns} dataSource={data}>
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <span>
                  <Button type="link">Invite {record.lastName}</Button>
                  <Divider type="vertical" />
                  <Button type="link">Delete</Button>
                </span>
              )}
            />
          </Table>
          {/* <List
            itemLayout="horizontal"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 5
            }}
            dataSource={dataToDisplay}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<DisplayAvatar srcPath={item.imgPath} />}
                  title={<a href="#">{item.title}</a>}
                  description={item.content}
                />
              </List.Item>
            )}
          /> */}
        </Spin>
      </Fragment>
    );
  }
}
const getState = state => {
  return {
    UsersResponse: state.getAllListUsers
  };
};
export default connect(getState, {
  getAllListUsers
})(Users);
