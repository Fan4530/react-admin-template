
import React from 'react';
import { Row, Col, Card } from 'antd';
import FixedTable from './FixedTable';
import ExpandedTable from './ExpandedTable';
import EditableTable from './EditableTable';
import BreadcrumbCustom from '../BreadcrumbCustom';

class AdvancedTables extends React.Component {
    render() {
        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="table" second="advanced table" />
                <Row gutter={16}>
                    <Col className="gutter-row" md={24}>
                        <div className="gutter-box">
                            <Card title="fixed column" bordered={false}>
                                <FixedTable />
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="extentionable" bordered={false}>
                                <ExpandedTable />
                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={12}>
                        <div className="gutter-box">
                            <Card title="可编辑" bordered={false}>
                                <EditableTable />
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default AdvancedTables;
